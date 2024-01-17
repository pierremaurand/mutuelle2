﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using mefApi.Data;

#nullable disable

namespace mefapi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("mefApi.Models.Avance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DateDemande")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DeboursementId")
                        .HasColumnType("int");

                    b.Property<int>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("MontantSollicite")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("NombreEcheancesSollicite")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DeboursementId")
                        .IsUnique()
                        .HasFilter("[DeboursementId] IS NOT NULL");

                    b.HasIndex("MembreId");

                    b.ToTable("Avances");
                });

            modelBuilder.Entity("mefApi.Models.CompteComptable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Compte")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("CompteComptables");
                });

            modelBuilder.Entity("mefApi.Models.Cotisation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Annee")
                        .HasColumnType("int");

                    b.Property<int>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<int>("MoisId")
                        .HasColumnType("int");

                    b.Property<decimal>("Montant")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("MembreId");

                    b.HasIndex("MoisId");

                    b.ToTable("Cotisations");
                });

            modelBuilder.Entity("mefApi.Models.Credit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DateDemande")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DeboursementId")
                        .HasColumnType("int");

                    b.Property<int>("DureeSollicite")
                        .HasColumnType("int");

                    b.Property<int>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("MontantSollicite")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("DeboursementId")
                        .IsUnique()
                        .HasFilter("[DeboursementId] IS NOT NULL");

                    b.HasIndex("MembreId");

                    b.ToTable("Credits");
                });

            modelBuilder.Entity("mefApi.Models.Deboursement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DateDecaissement")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DureeAccordee")
                        .HasColumnType("int");

                    b.Property<int>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("MontantAccorde")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("MontantCommission")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal?>("MontantInteret")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("MembreId");

                    b.ToTable("Deboursements");
                });

            modelBuilder.Entity("mefApi.Models.DetailEcritureComptable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CompteComptableId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("Montant")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("TypeOperation")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompteComptableId");

                    b.ToTable("DetailEcritureComptables");
                });

            modelBuilder.Entity("mefApi.Models.Echeance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("AvanceId")
                        .HasColumnType("int");

                    b.Property<decimal?>("Capital")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("CreditId")
                        .HasColumnType("int");

                    b.Property<string>("DateEcheance")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Interet")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("MontantEcheance")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("AvanceId");

                    b.HasIndex("CreditId");

                    b.HasIndex("MembreId");

                    b.ToTable("Echeances");
                });

            modelBuilder.Entity("mefApi.Models.EcritureComptable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("Montant")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("MouvementId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MouvementId");

                    b.ToTable("EcritureComptables");
                });

            modelBuilder.Entity("mefApi.Models.Gabarit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("EstActif")
                        .HasColumnType("bit");

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Gabarits");
                });

            modelBuilder.Entity("mefApi.Models.LieuAffectation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lieu")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("LieuAffectations");
                });

            modelBuilder.Entity("mefApi.Models.Membre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Contact")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateAdhesion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateNaissance")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EstActif")
                        .HasColumnType("bit");

                    b.Property<int>("LieuAffectationId")
                        .HasColumnType("int");

                    b.Property<string>("LieuNaissance")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Photo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PosteId")
                        .HasColumnType("int");

                    b.Property<int>("SexeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LieuAffectationId");

                    b.HasIndex("PosteId");

                    b.HasIndex("SexeId");

                    b.ToTable("Membres");
                });

            modelBuilder.Entity("mefApi.Models.Mois", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<string>("Valeur")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.HasKey("Id");

                    b.ToTable("Mois");
                });

            modelBuilder.Entity("mefApi.Models.Mouvement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("AvanceId")
                        .HasColumnType("int");

                    b.Property<int?>("CotisationId")
                        .HasColumnType("int");

                    b.Property<int?>("CreditId")
                        .HasColumnType("int");

                    b.Property<string>("DateMvt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DeboursementId")
                        .HasColumnType("int");

                    b.Property<int?>("EcheanceId")
                        .HasColumnType("int");

                    b.Property<int?>("GabaritId")
                        .HasColumnType("int");

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal?>("Montant")
                        .IsRequired()
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("TypeOperation")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AvanceId");

                    b.HasIndex("CotisationId");

                    b.HasIndex("CreditId");

                    b.HasIndex("DeboursementId")
                        .IsUnique()
                        .HasFilter("[DeboursementId] IS NOT NULL");

                    b.HasIndex("EcheanceId");

                    b.HasIndex("GabaritId");

                    b.HasIndex("MembreId");

                    b.ToTable("Mouvements");
                });

            modelBuilder.Entity("mefApi.Models.Operation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CompteComptableId")
                        .HasColumnType("int");

                    b.Property<int>("GabaritId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<decimal>("Taux")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("TypeOperation")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompteComptableId");

                    b.HasIndex("GabaritId");

                    b.ToTable("Operations");
                });

            modelBuilder.Entity("mefApi.Models.Parametre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<string>("Valeur")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Parametres");
                });

            modelBuilder.Entity("mefApi.Models.Poste", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Postes");
                });

            modelBuilder.Entity("mefApi.Models.Sexe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Symbole")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Sexes");
                });

            modelBuilder.Entity("mefApi.Models.Utilisateur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte[]>("ClesMotDePasse")
                        .HasColumnType("varbinary(max)");

                    b.Property<int?>("MembreId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ModifieLe")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifiePar")
                        .HasColumnType("int");

                    b.Property<byte[]>("MotDePasse")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("NomUtilisateur")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MembreId")
                        .IsUnique()
                        .HasFilter("[MembreId] IS NOT NULL");

                    b.ToTable("Utilisateurs");
                });

            modelBuilder.Entity("mefApi.Models.Avance", b =>
                {
                    b.HasOne("mefApi.Models.Deboursement", "Deboursement")
                        .WithOne("Avance")
                        .HasForeignKey("mefApi.Models.Avance", "DeboursementId");

                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithMany("Avances")
                        .HasForeignKey("MembreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Deboursement");

                    b.Navigation("Membre");
                });

            modelBuilder.Entity("mefApi.Models.Cotisation", b =>
                {
                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithMany("Cotisations")
                        .HasForeignKey("MembreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mefApi.Models.Mois", "Mois")
                        .WithMany()
                        .HasForeignKey("MoisId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Membre");

                    b.Navigation("Mois");
                });

            modelBuilder.Entity("mefApi.Models.Credit", b =>
                {
                    b.HasOne("mefApi.Models.Deboursement", "Deboursement")
                        .WithOne("Credit")
                        .HasForeignKey("mefApi.Models.Credit", "DeboursementId");

                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithMany("Credits")
                        .HasForeignKey("MembreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Deboursement");

                    b.Navigation("Membre");
                });

            modelBuilder.Entity("mefApi.Models.Deboursement", b =>
                {
                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithMany()
                        .HasForeignKey("MembreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Membre");
                });

            modelBuilder.Entity("mefApi.Models.DetailEcritureComptable", b =>
                {
                    b.HasOne("mefApi.Models.CompteComptable", "CompteComptable")
                        .WithMany()
                        .HasForeignKey("CompteComptableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CompteComptable");
                });

            modelBuilder.Entity("mefApi.Models.Echeance", b =>
                {
                    b.HasOne("mefApi.Models.Avance", "Avance")
                        .WithMany("Echeancier")
                        .HasForeignKey("AvanceId");

                    b.HasOne("mefApi.Models.Credit", "Credit")
                        .WithMany("Echeancier")
                        .HasForeignKey("CreditId");

                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithMany()
                        .HasForeignKey("MembreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Avance");

                    b.Navigation("Credit");

                    b.Navigation("Membre");
                });

            modelBuilder.Entity("mefApi.Models.EcritureComptable", b =>
                {
                    b.HasOne("mefApi.Models.Mouvement", "Mouvement")
                        .WithMany()
                        .HasForeignKey("MouvementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mouvement");
                });

            modelBuilder.Entity("mefApi.Models.Membre", b =>
                {
                    b.HasOne("mefApi.Models.LieuAffectation", "LieuAffectation")
                        .WithMany()
                        .HasForeignKey("LieuAffectationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mefApi.Models.Poste", "Poste")
                        .WithMany()
                        .HasForeignKey("PosteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mefApi.Models.Sexe", "Sexe")
                        .WithMany()
                        .HasForeignKey("SexeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LieuAffectation");

                    b.Navigation("Poste");

                    b.Navigation("Sexe");
                });

            modelBuilder.Entity("mefApi.Models.Mouvement", b =>
                {
                    b.HasOne("mefApi.Models.Avance", "Avance")
                        .WithMany("Mouvements")
                        .HasForeignKey("AvanceId");

                    b.HasOne("mefApi.Models.Cotisation", "Cotisation")
                        .WithMany("Mouvements")
                        .HasForeignKey("CotisationId");

                    b.HasOne("mefApi.Models.Credit", "Credit")
                        .WithMany("Mouvements")
                        .HasForeignKey("CreditId");

                    b.HasOne("mefApi.Models.Deboursement", "Deboursement")
                        .WithOne("Mouvement")
                        .HasForeignKey("mefApi.Models.Mouvement", "DeboursementId");

                    b.HasOne("mefApi.Models.Echeance", "Echeance")
                        .WithMany("Mouvements")
                        .HasForeignKey("EcheanceId");

                    b.HasOne("mefApi.Models.Gabarit", "Gabarit")
                        .WithMany()
                        .HasForeignKey("GabaritId");

                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithMany("Mouvements")
                        .HasForeignKey("MembreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Avance");

                    b.Navigation("Cotisation");

                    b.Navigation("Credit");

                    b.Navigation("Deboursement");

                    b.Navigation("Echeance");

                    b.Navigation("Gabarit");

                    b.Navigation("Membre");
                });

            modelBuilder.Entity("mefApi.Models.Operation", b =>
                {
                    b.HasOne("mefApi.Models.CompteComptable", "CompteComptable")
                        .WithMany()
                        .HasForeignKey("CompteComptableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("mefApi.Models.Gabarit", "Gabarit")
                        .WithMany()
                        .HasForeignKey("GabaritId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CompteComptable");

                    b.Navigation("Gabarit");
                });

            modelBuilder.Entity("mefApi.Models.Utilisateur", b =>
                {
                    b.HasOne("mefApi.Models.Membre", "Membre")
                        .WithOne("Utilisateur")
                        .HasForeignKey("mefApi.Models.Utilisateur", "MembreId");

                    b.Navigation("Membre");
                });

            modelBuilder.Entity("mefApi.Models.Avance", b =>
                {
                    b.Navigation("Echeancier");

                    b.Navigation("Mouvements");
                });

            modelBuilder.Entity("mefApi.Models.Cotisation", b =>
                {
                    b.Navigation("Mouvements");
                });

            modelBuilder.Entity("mefApi.Models.Credit", b =>
                {
                    b.Navigation("Echeancier");

                    b.Navigation("Mouvements");
                });

            modelBuilder.Entity("mefApi.Models.Deboursement", b =>
                {
                    b.Navigation("Avance");

                    b.Navigation("Credit");

                    b.Navigation("Mouvement");
                });

            modelBuilder.Entity("mefApi.Models.Echeance", b =>
                {
                    b.Navigation("Mouvements");
                });

            modelBuilder.Entity("mefApi.Models.Membre", b =>
                {
                    b.Navigation("Avances");

                    b.Navigation("Cotisations");

                    b.Navigation("Credits");

                    b.Navigation("Mouvements");

                    b.Navigation("Utilisateur");
                });
#pragma warning restore 612, 618
        }
    }
}
