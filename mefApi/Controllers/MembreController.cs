using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using System.Drawing;
using System.Drawing.Imaging;
using Microsoft.AspNetCore.SignalR;
using mefApi.HubConfig;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.Versioning;

namespace mefApi.Controllers
{
    public class MembreController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public MembreController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("membres")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var membres = await uow.MembreRepository.GetAllAsync();
            if(membres is null) {
                return NotFound("Aucun membre n'existe dans la bdd");
            }
            var membresDto = mapper.Map<List<MembreDto>>(membres);
            return Ok(membresDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var membre = await uow.MembreRepository.FindByIdAsync(id);
            if(membre is null) {
                return NotFound();
            }
            var membreDto = mapper.Map<MembreDto>(membre);
            return Ok(membreDto);
        }

        [HttpGet("get/infos/{id}")]
        public async Task<IActionResult> GetInfos(int id)
        {
            var membre = await uow.MembreRepository.FindByIdAsync(id);
            if(membre is null) {
                return NotFound();
            }
            var membreDto = mapper.Map<MembreInfosDto>(membre);
            return Ok(membreDto);
        }

        [SupportedOSPlatform("windows")]
        [HttpPost("add")]
        public async Task<IActionResult> Add(MembreDto membreDto)
        {
            if(membreDto is null) {
                return BadRequest("Les informations du membre sont manquant!");
            }

            var membre = mapper.Map<Membre>(membreDto);

            var membreExist = await uow.MembreRepository.MembreExists(membreDto);

            if(membreExist){
                return BadRequest("Ce membre existe déjà dans la base");
            } 

            membre.ModifiePar = GetUserId();
            membre.ModifieLe = DateTime.Now;
            uow.MembreRepository.Add(membre);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("MembreAdded");
            return StatusCode(201);
        }

        [SupportedOSPlatform("windows")]
        [HttpPost("addImage/{id}")]
        public async Task<IActionResult> AddImage(int id, PhotoMembreDto photo)
        {   
            if(photo is not null) {
                if(photo.Image is not null) {
                    var membre = await this.uow.MembreRepository.FindByIdAsync(id);

                    if(membre is null) {
                        return BadRequest("Ce membre n'existe pas!");
                    }

                    byte[] bytes = Convert.FromBase64String(photo.Image);
            
                    Image image; 
                    using(MemoryStream ms = new MemoryStream(bytes)){
                        image = Image.FromStream(ms);
                    }
                    
                    int i = 0;
                    var imageName = "membre_"+id+"_"+i+"."+photo.Type;
                    if(photo.Photo is not null){
                        while(photo.Photo.Equals(imageName)){
                            i += 1;
                            imageName = "membre_"+id+"_"+i+"."+photo.Type;
                        }
                    }

                    image.Save("wwwroot/assets/images/" + imageName, ImageFormat.Png);

                    membre.Photo = imageName;
                    await uow.SaveAsync();
                    await signalrHub.Clients.All.SendAsync("MembreAdded");
                }
            } else {
                return BadRequest("Aucune image n'a été attaché!");
            }
            
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,MembreDto membreDto)
        {
            if(id != membreDto.Id) 
                return BadRequest("Update not allowed");

            var membreFromDb = await uow.MembreRepository.FindByIdAsync(id);
            
            if(membreFromDb == null) 
                return BadRequest("Update not allowed");

            membreFromDb.ModifiePar = GetUserId();
            membreFromDb.ModifieLe = DateTime.Now;
            mapper.Map(membreDto, membreFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("MembreAdded");
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteMembre(int id)
        {
            uow.MembreRepository.Delete(id);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("MembreAdded");
            return Ok(id);
        }

    }
}