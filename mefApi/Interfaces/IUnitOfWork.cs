namespace mefApi.Interfaces
{
    public interface IUnitOfWork
    {
        ISexeRepository SexeRepository { get; }
        IPosteRepository PosteRepository { get; }
        ILieuAffectationRepository LieuAffectationRepository { get; }
        IMembreRepository MembreRepository { get; }
        ICompteComptableRepository CompteComptableRepository { get; }
        IGabaritRepository GabaritRepository { get; }
        IOperationRepository OperationRepository { get; }
        ICompteRepository CompteRepository { get; }
        ICotisationRepository CotisationRepository { get; }
        IMoisRepository MoisRepository { get; }
        IAvanceRepository AvanceRepository { get; }
        IDeboursementRepository DeboursementRepository { get; }
        ICreditRepository CreditRepository { get; }
        IEcheanceRepository EcheanceRepository { get; }
        IUtilisateurRepository UtilisateurRepository { get; }
        IMouvementRepository MouvementRepository { get; }
        IParametreRepository ParametreRepository { get; }
        
        
        Task<bool> SaveAsync();
    }
}