using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class UtilisateurController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        private readonly IHubContext<SignalrServer> signalrHub; 

        public UtilisateurController(IMapper mapper, IUnitOfWork uow, IConfiguration configuration, IHubContext<SignalrServer> signalrHub)
        {
            this.configuration = configuration;
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("utilisateurs")]
        public async Task<IActionResult> GetAll()
        {
            var utilisateurs = await uow.UtilisateurRepository.GetAllAsync();
            if(utilisateurs is null) {
                return NotFound("Aucun utilisateurs n'est enregistré dans la bdd");
            }
            var utilisateursDto = mapper.Map<List<UtilisateurDto>>(utilisateurs);
            return Ok(utilisateursDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var utilisateur = await uow.UtilisateurRepository.FindByIdAsync(id);
            if(utilisateur is null) {
                return NotFound();
            }
            var utilisateurDto = mapper.Map<UtilisateurDto>(utilisateur);
            return Ok(utilisateurDto);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginReqDto loginReqDto)
        {   
            var utilisateur = await uow.UtilisateurRepository.Authenticate(loginReqDto.Login);

            if(utilisateur is null) {
                return Unauthorized("Cet utilisateur n'existe pas dans la base");
            }

            if(
                utilisateur.MotDePasse is not null && 
                utilisateur.ClesMotDePasse is not null && 
                !MatchPasswordHash(loginReqDto.Password,utilisateur.MotDePasse,utilisateur.ClesMotDePasse)
            ) {
                 return Unauthorized("Le mot de passe est invalide");
            }
               

            var loginResDto = new LoginResDto();
            loginResDto.Nom = utilisateur.NomUtilisateur;
            loginResDto.Id = utilisateur.Id;
            loginResDto.MembreId = utilisateur.MembreId;
            loginResDto.Token = CreateJWT(utilisateur);

            return Ok(loginResDto);
        }

        [HttpPost("login2")]
        [AllowAnonymous]
        public async Task<IActionResult> Login2(LoginFormDto loginFormDto)
        {   
            var utilisateur = await uow.UtilisateurRepository.Authenticate(loginFormDto.Username);

            if(utilisateur is null) {
                return Unauthorized("Cet utilisateur n'existe pas dans la base");
            }

            if(
                utilisateur.MotDePasse is not null && 
                utilisateur.ClesMotDePasse is not null && 
                !MatchPasswordHash(loginFormDto.Password,utilisateur.MotDePasse,utilisateur.ClesMotDePasse)
            ) {
                 return Unauthorized("Le mot de passe est invalide");
            }
               

            var loginResDto = new LoginResDto();
            loginResDto.Nom = utilisateur.NomUtilisateur;
            loginResDto.Id = utilisateur.Id;
            loginResDto.MembreId = utilisateur.MembreId;
            loginResDto.Token = CreateJWT(utilisateur);

            return Ok(loginResDto);
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> Add(UtilisateurDto utilisateurDto)
        {   
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);
            
            if(await uow.UtilisateurRepository.UtilisateurExists(utilisateurDto)) 
                return BadRequest("Cet utilisateur existe déjà, veillez choisir un autre.");

            byte[] passwordHash, passwordKey;

            using(var hmac = new HMACSHA512()){
               passwordKey = hmac.Key;
               passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("mutuelle"));
            }

            var utilisateur = mapper.Map<Utilisateur>(utilisateurDto);
            utilisateur.MotDePasse = passwordHash;
            utilisateur.ClesMotDePasse = passwordKey;
            utilisateur.ModifiePar = GetUserId();
            // utilisateur.ModifiePar = 0;
            utilisateur.ModifieLe = DateTime.Now;
            uow.UtilisateurRepository.Add(utilisateur);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("UtilisateurAdded");
            return StatusCode(201);

        }

        [HttpPut("initPassword/{id}")]
        public async Task<IActionResult> InitPassword(int id, UtilisateurDto utilisateurDto) {
            if(id != utilisateurDto.Id) {
                return BadRequest("Reinitialisation impossible!");
            }

            byte[] passwordHash, passwordKey;

            var utilisateur = await uow.UtilisateurRepository.FindByIdAsync(id);
            if(utilisateur is null) {
                return NotFound("Cet utilisateur n'existe pas dans la base de données");
            }

            using(var hmac = new HMACSHA512()){
               passwordKey = hmac.Key;
               passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("mutuelle"));
            }

            utilisateur.MotDePasse = passwordHash;
            utilisateur.ClesMotDePasse = passwordKey;
            utilisateur.ModifiePar = GetUserId();
            utilisateur.ModifieLe = DateTime.Now;
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("changePassword")]
        public async Task<IActionResult> changePassword(InfosPassword infos) {
            if(!ModelState.IsValid || infos.Password != infos.ConfirmPassword) {
                return BadRequest("Changement de mot de passe impossible!");
            }

            var id = GetUserId();

            var utilisateur = await uow.UtilisateurRepository.FindByIdAsync(id);
            if(utilisateur is null) {
                return NotFound("Cet utilisateur n'existe pas dans la base de données");
            }

            byte[] passwordHash, passwordKey;

            using(var hmac = new HMACSHA512()){
               passwordKey = hmac.Key;
               passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(infos.Password));
            }

            utilisateur.MotDePasse = passwordHash;
            utilisateur.ClesMotDePasse = passwordKey;
            utilisateur.ModifiePar = GetUserId();
            utilisateur.ModifieLe = DateTime.Now;
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,UtilisateurDto utilisateurDto)
        {   
            if(id != utilisateurDto.Id) 
                return BadRequest("Update not allowed");

            var utilisateurFromDb = await uow.UtilisateurRepository.FindByIdAsync(id);
            
            if(utilisateurFromDb == null) 
                return BadRequest("Update not allowed");

            utilisateurFromDb.ModifiePar = GetUserId();
            utilisateurFromDb.ModifieLe = DateTime.Now;
            mapper.Map(utilisateurDto, utilisateurFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("UtilisateurAdded");
            return StatusCode(200);
        }

        private string CreateJWT(Utilisateur utilisateur){
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new Claim[]{
                new Claim(ClaimTypes.Name, utilisateur.NomUtilisateur),
                new Claim(ClaimTypes.NameIdentifier, utilisateur.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key,SecurityAlgorithms.HmacSha256Signature
            );

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool MatchPasswordHash(string passworText, byte[] password, byte[] passwordKey) 
        {
            using(var hmac = new HMACSHA512(passwordKey)){
               var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passworText));
            
               for(int i=0; i<passwordHash.Length; i++) 
               {
                    if(password[i] != passwordHash[i]) 
                        return false;
               }
            }
            return true;
        }
    }
}