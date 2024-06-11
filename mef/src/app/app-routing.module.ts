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
import { NouveauMouvementComponent } from './pages/compte/nouveau-mouvement/nouveau-mouvement.component';
import { CotisationsMembreComponent } from './pages/cotisations/cotisations-membre/cotisations-membre.component';
import { PageParametresComponent } from './pages/parametres/page-parametres/page-parametres.component';
import { NouveauParametreComponent } from './pages/parametres/nouveau-parametre/nouveau-parametre.component';
import { ListeMembresComponent } from './pages/membres/liste-membres/liste-membres.component';
import { FicheDetailsMembreComponent } from './composants/fiche-details-membre/fiche-details-membre.component';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent,
  },
  {
    path: 'home',
    component: AccueilComponent,
    data: { animation: 'enterLeavePage' },
    canActivate: [AuthService],
    children: [
      {
        path: '',
        component: VueEnsembleComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'statistiques',
        component: StatistiquesComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'membres',
        //component: MembreListComponent,
        component: ListeMembresComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaumembre/:membreId',
        component: NouveauMembreComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'comptes',
        component: PageCompteComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'details-membre/:id',
        component: FicheDetailsMembreComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucompte',
        component: NouveauCompteComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'addmouvement/:id',
        component: NouveauMouvementComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucompte/:id',
        component: NouveauCompteComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'cotisations',
        component: PageCotisationComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'cotisationsmembre/:id',
        component: CotisationsMembreComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'addcotisation/:id',
        component: NouvelleCotisationComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'avances',
        component: PageAvanceComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouvelleavance/:avanceId',
        component: NouvelleAvanceComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'echeancesAvances',
        component: PageEcheancesAvancesComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'credits',
        component: PageCreditComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucredit/:creditId',
        component: NouveauCreditComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'echeancesCredits',
        component: PageEcheancesCreditsComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'profil',
        component: PageProfilComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'changermotdepasse',
        component: ChangerMotDePasseComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'utilisateurs',
        component: PageUtilisateurComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouvelutilisateur/:utilisateurId',
        component: NouvelUtilisateurComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'parametres',
        component: PageParametresComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveauparametre/:parametreId',
        component: NouveauParametreComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'profile',
        component: PageProfileComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'comptecomptables',
        component: PageCompteComptableComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaucomptecomptable/:compteComptableId',
        component: NouveauCompteComptableComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'gabarits',
        component: PageGabaritComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaugabarit/:gabaritId',
        component: NouveauGabaritComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'sexes',
        component: PageSexeComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveausexe/:sexeId',
        component: NouveauSexeComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'postes',
        component: PagePosteComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveauposte/:posteId',
        component: NouveauPosteComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'lieuaffectations',
        component: PageLieuAffectationComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
      {
        path: 'nouveaulieuaffectation/:lieuAffectationId',
        component: NouveauLieuAffectationComponent,
        data: { animation: 'enterLeavePage' },
        canActivate: [AuthService],
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
