using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class UtilisateurRepository : IUtilisateurRepository
    {
        public readonly DataContext dc;

        public UtilisateurRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<Utilisateur?> Authenticate(string login)
        {
            if(dc.Utilisateurs is not null)
                return await dc.Utilisateurs.FirstOrDefaultAsync(u => u.NomUtilisateur == login);

            return null;
        }

        public void Add(Utilisateur utilisateur) 
        {
            if(dc.Utilisateurs is not null)
            {
                 dc.Utilisateurs.Add(utilisateur);
            }  
        }

        public async Task<bool> UtilisateurExists(UtilisateurDto user)
        {
            if(dc.Utilisateurs is not null)
                return await dc.Utilisateurs.AnyAsync(x => x.NomUtilisateur == user.NomUtilisateur || x.MembreId == user.MembreId);
            return false;
        }

        public async Task<Utilisateur?> FindByIdAsync(int id)
        {
            if(dc.Utilisateurs is not null) {
                var utilisateur = await dc.Utilisateurs
                .Include(s => s.Membre)
                .Where(s => s.Id == id)
                .FirstAsync();
                if(utilisateur is not null) {
                    return utilisateur;
                }
            }

            return null;
        }


        public async Task<Utilisateur?> FindByIdAsync(string userName)
        {
            if(dc.Utilisateurs is not null) {
                var utilisateur = await dc.Utilisateurs
                .Where(s => s.NomUtilisateur == userName)
                .FirstAsync();
                if(utilisateur is not null) {
                    return utilisateur;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Utilisateur>?> GetAllAsync()
        {
            if(dc.Utilisateurs is not null) {
                var utilisateurs = await dc.Utilisateurs
                .ToListAsync();
                if(utilisateurs is not null) {
                    return utilisateurs;
                }
            }
            return null;
        }
    }
}