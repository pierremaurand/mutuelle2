import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/utilisateur/page-login/page-login.component';
import { MembreListComponent } from './pages/membres/membre-list/membre-list.component';
import { NouveauMembreComponent } from './pages/membres/nouveau-membre/nouveau-membre.component';
import { PageCompteComponent } from './pages/compte/page-compte/page-compte.component';
import { PageAvanceComponent } from './pages/avances/page-avance/page-avance.component';
import { PageCreditComponent } from './pages/credits/page-credit/page-credit.component';
import { PageCotisationComponent } from './pages/cotisations/page-cotisation/page-cotisation.component';
import { PageProfilComponent } from './pages/profil/page-profil/page-profil.component';
import { ChangerMotDePasseComponent } from './pages/profil/changer-mot-de-passe/changer-mot-de-passe.component';
import { PageUtilisateurComponent } from './pages/utilisateur/page-utilisateur/page-utilisateur.component';
import { PageCompteComptableComponent } from './pages/compte-comptable/page-compte-comptable/page-compte-comptable.component';
import { PageGabaritComponent } from './pages/gabarit/page-gabarit/page-gabarit.component';
import { PageSexeComponent } from './pages/sexe/page-sexe/page-sexe.component';
import { PagePosteComponent } from './pages/poste/page-poste/page-poste.component';
import { NouveauSexeComponent } from './pages/sexe/nouveau-sexe/nouveau-sexe.component';
import { NouveauPosteComponent } from './pages/poste/nouveau-poste/nouveau-poste.component';
import { NouveauCompteComptableComponent } from './pages/compte-comptable/nouveau-compte-comptable/nouveau-compte-comptable.component';
import { NouveauGabaritComponent } from './pages/gabarit/nouveau-gabarit/nouveau-gabarit.component';
import { NouveauCompteComponent } from './pages/compte/nouveau-compte/nouveau-compte.component';
import { NouveauLieuAffectationComponent } from './pages/affectation/nouveau-lieu-affectation/nouveau-lieu-affectation.component';
import { PageLieuAffectationComponent } from './pages/affectation/page-lieu-affectation/page-lieu-affectation.component';
import { NouvelleCotisationComponent } from './pages/cotisations/nouvelle-cotisation/nouvelle-cotisation.component';
import { NouvelleAvanceComponent } from './pages/avances/nouvelle-avance/nouvelle-avance.component';
import { NouveauCreditComponent } from './pages/credits/nouveau-credit/nouveau-credit.component';
import { AuthService } from './services/auth.service';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { StatistiquesComponent } from './pages/accueil/statistiques/statistiques.component';
import { VueEnsembleComponent } from './pages/accueil/vue-ensemble/vue-ensemble.component';
import { NouvelUtilisateurComponent } from './pages/utilisateur/nouvel-utilisateur/nouvel-utilisateur.component';
import { PageProfileComponent } from './pages/utilisateur/page-profile/page-profile.component';
import { PageEcheancesAvancesComponent } from './pages/avances/page-echeances-avances/page-echeances-avances.component';
import { PageEcheancesCreditsComponent } from './pages/credits/page-echeances-credits/page-echeances-credits.component';
import { ImportMembresComponent } from './pages/membres/import-membres/import-membres.component';
import { NouveauMouvementComponent } from './pages/compte/nouveau-mouvement/nouveau-mouvement.component';
import { CotisationsMembreComponent } from './pages/cotisations/cotisations-membre/cotisations-membre.component';
import { MembreResolver } from './resolvers/membre.resolver';
import { AvanceResolver } from './resolvers/avance.resolver';
import { DeboursementResolver } from './resolvers/deboursement.resolver';
import { EcheancierResolver } from './resolvers/echeancier.resolver';
import { MouvementsResolver } from './resolvers/mouvements.resolver';
import { UtilisateurResolver } from './resolvers/utilisateur.resolver';
import { LieuxResolver } from './resolvers/lieux.resolver';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent,
  },
  {
    path: '',
    component: AccueilComponent,
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: VueEnsembleComponent,
        canActivate: [AuthService],
      },
      {
        path: 'statistiques',
        component: StatistiquesComponent,
        canActivate: [AuthService],
      },
      {
        path: 'membres',
        component: MembreListComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaumembre/:membreId',
        component: NouveauMembreComponent,
        resolve: { membre: MembreResolver },
        canActivate: [AuthService],
      },
      {
        path: 'importmembres',
        component: ImportMembresComponent,
        canActivate: [AuthService],
      },
      {
        path: 'comptes',
        component: PageCompteComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucompte',
        component: NouveauCompteComponent,
        canActivate: [AuthService],
      },
      {
        path: 'addmouvement/:id',
        component: NouveauMouvementComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucompte/:id',
        component: NouveauCompteComponent,
        canActivate: [AuthService],
      },
      {
        path: 'cotisations',
        component: PageCotisationComponent,
        canActivate: [AuthService],
      },
      {
        path: 'cotisationsmembre/:id',
        component: CotisationsMembreComponent,
        canActivate: [AuthService],
      },
      {
        path: 'addcotisation/:id',
        component: NouvelleCotisationComponent,
        canActivate: [AuthService],
      },
      {
        path: 'avances',
        component: PageAvanceComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouvelleavance/:avanceId/:membreId/:deboursementId',
        component: NouvelleAvanceComponent,
        resolve: {
          avance: AvanceResolver,
          membre: MembreResolver,
          deboursement: DeboursementResolver,
          echeancier: EcheancierResolver,
          mouvements: MouvementsResolver,
        },
        canActivate: [AuthService],
      },
      {
        path: 'echeancesAvances',
        component: PageEcheancesAvancesComponent,
        canActivate: [AuthService],
      },
      {
        path: 'credits',
        component: PageCreditComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucredit',
        component: NouveauCreditComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucredit/:creditId',
        component: NouveauCreditComponent,
        canActivate: [AuthService],
      },
      {
        path: 'echeancesCredits',
        component: PageEcheancesCreditsComponent,
        canActivate: [AuthService],
      },
      {
        path: 'profil',
        component: PageProfilComponent,
        canActivate: [AuthService],
      },
      {
        path: 'changermotdepasse',
        component: ChangerMotDePasseComponent,
        canActivate: [AuthService],
      },
      {
        path: 'utilisateurs',
        component: PageUtilisateurComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouvelutilisateur/:utilisateurId/:membreId',
        component: NouvelUtilisateurComponent,
        resolve: {
          utilisateur: UtilisateurResolver,
          membre: MembreResolver,
        },
        canActivate: [AuthService],
      },
      {
        path: 'profile',
        component: PageProfileComponent,
        canActivate: [AuthService],
      },
      {
        path: 'comptecomptables',
        component: PageCompteComptableComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucomptecomptable',
        component: NouveauCompteComptableComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucomptecomptable/:id',
        component: NouveauCompteComptableComponent,
        canActivate: [AuthService],
      },
      {
        path: 'gabarits',
        component: PageGabaritComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaugabarit',
        component: NouveauGabaritComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaugabarit/:id',
        component: NouveauGabaritComponent,
        canActivate: [AuthService],
      },
      {
        path: 'sexes',
        component: PageSexeComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveausexe',
        component: NouveauSexeComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveausexe/:id',
        component: NouveauSexeComponent,
        canActivate: [AuthService],
      },
      {
        path: 'postes',
        component: PagePosteComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveauposte',
        component: NouveauPosteComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveauposte/:id',
        component: NouveauPosteComponent,
        canActivate: [AuthService],
      },
      {
        path: 'lieuaffectations',
        component: PageLieuAffectationComponent,
        canActivate: [AuthService],
      },
      {
        path: 'nouveaulieuaffectation/:lieuAffectationId',
        component: NouveauLieuAffectationComponent,
        resolve: {
          lieuAffectation: LieuxResolver,
        },
        canActivate: [AuthService],
      },
    ],
  },
  {
    path: '**',
    component: PageLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
