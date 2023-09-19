using AutoMapper;
using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<Utilisateur, UtilisateurDto>().ReverseMap();

            CreateMap<Sexe, SexeDto>().ReverseMap();

            CreateMap<Membre, MembreDto>().ReverseMap();
            CreateMap<Membre, CompteDto>().ReverseMap();
            CreateMap<Membre, CompteInfosDto>().ReverseMap();
            CreateMap<Membre, CotisationInfosDto>().ReverseMap();
            CreateMap<Membre, CotisationMembreDto>().ReverseMap();
            CreateMap<Membre, MembreInfosDto>()
                .ForMember(m => m.Sexe, opt => opt.MapFrom(src => src.Sexe.Nom))
                .ForMember(m => m.Poste, opt => opt.MapFrom(src => src.Poste.Libelle))
                .ForMember(m => m.Lieu, opt => opt.MapFrom(src => src.LieuAffectation.Lieu));


            
            CreateMap<Poste, PosteDto>().ReverseMap();

            CreateMap<Mois, MoisDto>().ReverseMap();

            CreateMap<CompteComptable, CompteComptableDto>().ReverseMap();

            CreateMap<Gabarit, GabaritDto>().ReverseMap();
            CreateMap<Operation, OperationDto>().ReverseMap();

            CreateMap<Compte, CompteDto>().ReverseMap();

            CreateMap<Mouvement, MouvementDto>().ReverseMap();

            CreateMap<Cotisation, CotisationDto>().ReverseMap();
            
            CreateMap<LieuAffectation, LieuAffectationDto>().ReverseMap();
            
            CreateMap<Avance, AvanceDto>().ReverseMap();

            CreateMap<Deboursement, DeboursementDto>().ReverseMap();
            
            CreateMap<Echeance, EcheanceDto>().ReverseMap();

            CreateMap<Credit, CreditDto>().ReverseMap();
        }
    }
}