import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DndDirective } from './directives/dnd.directive';
import { PaginationComponent } from './composants/pagination/pagination.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BoutonActionComponent } from './composants/bouton-action/bouton-action.component';
import { LoaderComponent } from './composants/loader/loader.component';
import { WidgetComponent } from './composants/widget/widget.component';
import { SearchBarComponent } from './composants/search-bar/search-bar.component';
import { PageLoginComponent } from './pages/utilisateur/page-login/page-login.component';
import { MenuComponent } from './composants/menu/menu.component';
import { HeaderComponent } from './composants/header/header.component';
import { MembreListComponent } from './pages/membres/membre-list/membre-list.component';
import { DetailMembreComponent } from './pages/membres/detail-membre/detail-membre.component';
import { NouveauMembreComponent } from './pages/membres/nouveau-membre/nouveau-membre.component';
import { PageCompteComponent } from './pages/compte/page-compte/page-compte.component';
import { PageCotisationComponent } from './pages/cotisations/page-cotisation/page-cotisation.component';
import { PageAvanceComponent } from './pages/avances/page-avance/page-avance.component';
import { PageCreditComponent } from './pages/credits/page-credit/page-credit.component';
import { PageProfilComponent } from './pages/profil/page-profil/page-profil.component';
import { ChangerMotDePasseComponent } from './pages/profil/changer-mot-de-passe/changer-mot-de-passe.component';
import { PageUtilisateurComponent } from './pages/utilisateur/page-utilisateur/page-utilisateur.component';
import { PageGabaritComponent } from './pages/gabarit/page-gabarit/page-gabarit.component';
import { PageCompteComptableComponent } from './pages/compte-comptable/page-compte-comptable/page-compte-comptable.component';
import { PageSexeComponent } from './pages/sexe/page-sexe/page-sexe.component';
import { PagePosteComponent } from './pages/poste/page-poste/page-poste.component';
import { DetailUtilisateurComponent } from './composants/detail-utilisateur/detail-utilisateur.component';
import { ImageAddComponent } from './composants/image-add/image-add.component';
import { DetailSexeComponent } from './pages/sexe/detail-sexe/detail-sexe.component';
import { NouveauSexeComponent } from './pages/sexe/nouveau-sexe/nouveau-sexe.component';
import { NouveauPosteComponent } from './pages/poste/nouveau-poste/nouveau-poste.component';
import { DetailPosteComponent } from './pages/poste/detail-poste/detail-poste.component';
import { DetailCompteComptableComponent } from './pages/compte-comptable/detail-compte-comptable/detail-compte-comptable.component';
import { NouveauCompteComptableComponent } from './pages/compte-comptable/nouveau-compte-comptable/nouveau-compte-comptable.component';
import { NouveauGabaritComponent } from './pages/gabarit/nouveau-gabarit/nouveau-gabarit.component';
import { DetailGabaritComponent } from './pages/gabarit/detail-gabarit/detail-gabarit.component';
import { NouveauCompteComponent } from './pages/compte/nouveau-compte/nouveau-compte.component';
import { InfosMembreComponent } from './composants/infos-membre/infos-membre.component';
import { PageLieuAffectationComponent } from './pages/affectation/page-lieu-affectation/page-lieu-affectation.component';
import { NouveauLieuAffectationComponent } from './pages/affectation/nouveau-lieu-affectation/nouveau-lieu-affectation.component';
import { DetailLieuAffectationComponent } from './pages/affectation/detail-lieu-affectation/detail-lieu-affectation.component';
import { NouvelleCotisationComponent } from './pages/cotisations/nouvelle-cotisation/nouvelle-cotisation.component';
import { DetailCompteComponent } from './pages/compte/detail-compte/detail-compte.component';
import { DetailCotisationComponent } from './pages/cotisations/detail-cotisation/detail-cotisation.component';
import { DetailAvanceComponent } from './pages/avances/detail-avance/detail-avance.component';
import { NouvelleAvanceComponent } from './pages/avances/nouvelle-avance/nouvelle-avance.component';
import { NouveauCreditComponent } from './pages/credits/nouveau-credit/nouveau-credit.component';
import { DetailCreditComponent } from './pages/credits/detail-credit/detail-credit.component';
import { MenuLateralComponent } from './composants/menu-lateral/menu-lateral.component';
import { EnteteComponent } from './composants/entete/entete.component';
import { PiedPageComponent } from './composants/pied-page/pied-page.component';
import { VueEnsembleComponent } from './pages/accueil/vue-ensemble/vue-ensemble.component';
import { StatistiquesComponent } from './pages/accueil/statistiques/statistiques.component';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { DetailsMembreComponent } from './composants/details-membre/details-membre.component';
import { NouvelUtilisateurComponent } from './pages/utilisateur/nouvel-utilisateur/nouvel-utilisateur.component';
import { PageProfileComponent } from './pages/utilisateur/page-profile/page-profile.component';
import { ListeChoixMembreComponent } from './composants/liste-choix-membre/liste-choix-membre.component';
import { EcheancierAvanceComponent } from './composants/echeancier-avance/echeancier-avance.component';
import { EcheancierCreditComponent } from './composants/echeancier-credit/echeancier-credit.component';
import { PageEcheancesAvancesComponent } from './pages/avances/page-echeances-avances/page-echeances-avances.component';
import { DetailEcheanceAvanceComponent } from './pages/avances/detail-echeance-avance/detail-echeance-avance.component';
import { PayerEcheancesAvancesComponent } from './pages/avances/payer-echeances-avances/payer-echeances-avances.component';
import { DecalerEcheancesAvancesComponent } from './pages/avances/decaler-echeances-avances/decaler-echeances-avances.component';
import { PageEcheancesCreditsComponent } from './pages/credits/page-echeances-credits/page-echeances-credits.component';
import { PayerEcheancesCreditsComponent } from './pages/credits/payer-echeances-credits/payer-echeances-credits.component';
import { DetailEcheanceCreditComponent } from './pages/credits/detail-echeance-credit/detail-echeance-credit.component';
import { DecalerEcheancesCreditsComponent } from './pages/credits/decaler-echeances-credits/decaler-echeances-credits.component';
import { SortCreditPipe } from './pipes/sort-credit.pipe';
import { InfosCreditComponent } from './composants/infos-credit/infos-credit.component';
import { InfosMembreEcheanceComponent } from './composants/infos-membre-echeance/infos-membre-echeance.component';
import { InfosAvanceComponent } from './composants/infos-avance/infos-avance.component';
import { DetailsUtilisateurComponent } from './pages/utilisateur/details-utilisateur/details-utilisateur.component';
import { MouvementComponent } from './pages/compte/mouvement/mouvement.component';
import { MembreTraiteComponent } from './pages/membres/membre-traite/membre-traite.component';
import { NouveauMouvementComponent } from './pages/compte/nouveau-mouvement/nouveau-mouvement.component';
import { CotisationsMembreComponent } from './pages/cotisations/cotisations-membre/cotisations-membre.component';
import { CotisationComponent } from './pages/cotisations/cotisation/cotisation.component';
import { EcheancierComponent } from './composants/echeancier/echeancier.component';
import { FiltreMembreComponent } from './composants/filtre-membre/filtre-membre.component';
import { NouvelleOperationComponent } from './pages/gabarit/nouvelle-operation/nouvelle-operation.component';
import { MembreModule } from './modules/membre/membre.module';
import { CotisationModule } from './modules/cotisation/cotisation.module';
import { AvanceModule } from './modules/avance/avance.module';
import { CreditModule } from './modules/credit/credit.module';
import { CompteModule } from './modules/compte/compte.module';
import { ComptabiliteModule } from './modules/comptabilite/comptabilite.module';
import { AdminModule } from './modules/admin/admin.module';
import { PageParametresComponent } from './pages/parametres/page-parametres/page-parametres.component';
import { NouveauParametreComponent } from './pages/parametres/nouveau-parametre/nouveau-parametre.component';
import { DetailParametreComponent } from './pages/parametres/detail-parametre/detail-parametre.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SortPipe,
    SortCreditPipe,
    DndDirective,
    PaginationComponent,
    BoutonActionComponent,
    LoaderComponent,
    WidgetComponent,
    SearchBarComponent,
    PageLoginComponent,
    MenuComponent,
    HeaderComponent,
    MembreListComponent,
    DetailMembreComponent,
    NouveauMembreComponent,
    PageCompteComponent,
    PageCotisationComponent,
    DetailCotisationComponent,
    PageAvanceComponent,
    PageCreditComponent,
    PageProfilComponent,
    ChangerMotDePasseComponent,
    PageUtilisateurComponent,
    PageGabaritComponent,
    PageCompteComptableComponent,
    PageSexeComponent,
    PagePosteComponent,
    DetailUtilisateurComponent,
    ImageAddComponent,
    DetailSexeComponent,
    NouveauSexeComponent,
    NouveauPosteComponent,
    DetailPosteComponent,
    DetailCompteComptableComponent,
    NouveauCompteComptableComponent,
    NouveauGabaritComponent,
    DetailGabaritComponent,
    NouveauCompteComponent,
    DetailCompteComponent,
    InfosMembreComponent,
    PageLieuAffectationComponent,
    NouveauLieuAffectationComponent,
    DetailLieuAffectationComponent,
    NouvelleCotisationComponent,
    DetailAvanceComponent,
    NouvelleAvanceComponent,
    NouveauCreditComponent,
    DetailCreditComponent,
    MenuLateralComponent,
    EnteteComponent,
    PiedPageComponent,
    AccueilComponent,
    VueEnsembleComponent,
    StatistiquesComponent,
    DetailsMembreComponent,
    NouvelUtilisateurComponent,
    PageProfileComponent,
    ListeChoixMembreComponent,
    EcheancierAvanceComponent,
    EcheancierCreditComponent,
    PageEcheancesAvancesComponent,
    DetailEcheanceAvanceComponent,
    PayerEcheancesAvancesComponent,
    DecalerEcheancesAvancesComponent,
    PageEcheancesCreditsComponent,
    PayerEcheancesCreditsComponent,
    DetailEcheanceCreditComponent,
    DecalerEcheancesCreditsComponent,
    InfosCreditComponent,
    InfosMembreEcheanceComponent,
    InfosAvanceComponent,
    DetailsUtilisateurComponent,
    MouvementComponent,
    MembreTraiteComponent,
    NouveauMouvementComponent,
    CotisationsMembreComponent,
    CotisationComponent,
    EcheancierComponent,
    FiltreMembreComponent,
    NouvelleOperationComponent,
    PageParametresComponent,
    NouveauParametreComponent,
    DetailParametreComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AlertifyService,
    AuthService,
    DatePipe,
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    MembreModule,
    CotisationModule,
    AvanceModule,
    CreditModule,
    CompteModule,
    ComptabiliteModule,
    AdminModule,
  ],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
