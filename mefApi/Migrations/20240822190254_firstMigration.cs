using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mefapi.Migrations
{
    public partial class firstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompteComptables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Compte = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompteComptables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gabarits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EstActif = table.Column<bool>(type: "bit", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gabarits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LieuAffectations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lieu = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LieuAffectations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mois",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Valeur = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mois", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Parametres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Valeur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parametres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Postes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Postes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sexes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Symbole = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sexes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DetailEcritureComptables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompteComptableId = table.Column<int>(type: "int", nullable: false),
                    TypeOperation = table.Column<int>(type: "int", nullable: false),
                    Montant = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailEcritureComptables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailEcritureComptables_CompteComptables_CompteComptableId",
                        column: x => x.CompteComptableId,
                        principalTable: "CompteComptables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Operations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GabaritId = table.Column<int>(type: "int", nullable: false),
                    CompteComptableId = table.Column<int>(type: "int", nullable: false),
                    TypeOperation = table.Column<int>(type: "int", nullable: false),
                    Taux = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Operations_CompteComptables_CompteComptableId",
                        column: x => x.CompteComptableId,
                        principalTable: "CompteComptables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Operations_Gabarits_GabaritId",
                        column: x => x.GabaritId,
                        principalTable: "Gabarits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Membres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EstActif = table.Column<bool>(type: "bit", nullable: false),
                    SexeId = table.Column<int>(type: "int", nullable: false),
                    LieuAffectationId = table.Column<int>(type: "int", nullable: false),
                    PosteId = table.Column<int>(type: "int", nullable: false),
                    DateNaissance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAdhesion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LieuNaissance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Membres_LieuAffectations_LieuAffectationId",
                        column: x => x.LieuAffectationId,
                        principalTable: "LieuAffectations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Membres_Postes_PosteId",
                        column: x => x.PosteId,
                        principalTable: "Postes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Membres_Sexes_SexeId",
                        column: x => x.SexeId,
                        principalTable: "Sexes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Cotisations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MembreId = table.Column<int>(type: "int", nullable: false),
                    MoisId = table.Column<int>(type: "int", nullable: false),
                    Annee = table.Column<int>(type: "int", nullable: false),
                    Montant = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cotisations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cotisations_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Cotisations_Mois_MoisId",
                        column: x => x.MoisId,
                        principalTable: "Mois",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Deboursements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MontantAccorde = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MontantCommission = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MontantInteret = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DureeAccordee = table.Column<int>(type: "int", nullable: false),
                    DateDecaissement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MembreId = table.Column<int>(type: "int", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deboursements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deboursements_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Utilisateurs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomUtilisateur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotDePasse = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    ClesMotDePasse = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    MembreId = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: true),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateurs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Utilisateurs_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Avances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MembreId = table.Column<int>(type: "int", nullable: false),
                    MontantSollicite = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NombreEcheancesSollicite = table.Column<int>(type: "int", nullable: false),
                    DateDemande = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeboursementId = table.Column<int>(type: "int", nullable: true),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Avances_Deboursements_DeboursementId",
                        column: x => x.DeboursementId,
                        principalTable: "Deboursements",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Avances_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Credits",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MembreId = table.Column<int>(type: "int", nullable: false),
                    MontantSollicite = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DureeSollicite = table.Column<int>(type: "int", nullable: false),
                    DateDemande = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DeboursementId = table.Column<int>(type: "int", nullable: true),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Credits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Credits_Deboursements_DeboursementId",
                        column: x => x.DeboursementId,
                        principalTable: "Deboursements",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Credits_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Echeances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateEcheance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MontantEcheance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Capital = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Interet = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MembreId = table.Column<int>(type: "int", nullable: false),
                    AvanceId = table.Column<int>(type: "int", nullable: true),
                    CreditId = table.Column<int>(type: "int", nullable: true),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Echeances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Echeances_Avances_AvanceId",
                        column: x => x.AvanceId,
                        principalTable: "Avances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Echeances_Credits_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credits",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Echeances_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mouvements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateMvt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeOperation = table.Column<int>(type: "int", nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Montant = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GabaritId = table.Column<int>(type: "int", nullable: true),
                    MembreId = table.Column<int>(type: "int", nullable: false),
                    CotisationId = table.Column<int>(type: "int", nullable: true),
                    CreditId = table.Column<int>(type: "int", nullable: true),
                    AvanceId = table.Column<int>(type: "int", nullable: true),
                    DeboursementId = table.Column<int>(type: "int", nullable: true),
                    EcheanceId = table.Column<int>(type: "int", nullable: true),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mouvements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mouvements_Avances_AvanceId",
                        column: x => x.AvanceId,
                        principalTable: "Avances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mouvements_Cotisations_CotisationId",
                        column: x => x.CotisationId,
                        principalTable: "Cotisations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mouvements_Credits_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credits",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mouvements_Deboursements_DeboursementId",
                        column: x => x.DeboursementId,
                        principalTable: "Deboursements",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mouvements_Echeances_EcheanceId",
                        column: x => x.EcheanceId,
                        principalTable: "Echeances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mouvements_Gabarits_GabaritId",
                        column: x => x.GabaritId,
                        principalTable: "Gabarits",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Mouvements_Membres_MembreId",
                        column: x => x.MembreId,
                        principalTable: "Membres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EcritureComptables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Montant = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MouvementId = table.Column<int>(type: "int", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EcritureComptables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EcritureComptables_Mouvements_MouvementId",
                        column: x => x.MouvementId,
                        principalTable: "Mouvements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Avances_DeboursementId",
                table: "Avances",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Avances_MembreId",
                table: "Avances",
                column: "MembreId");

            migrationBuilder.CreateIndex(
                name: "IX_Cotisations_MembreId",
                table: "Cotisations",
                column: "MembreId");

            migrationBuilder.CreateIndex(
                name: "IX_Cotisations_MoisId",
                table: "Cotisations",
                column: "MoisId");

            migrationBuilder.CreateIndex(
                name: "IX_Credits_DeboursementId",
                table: "Credits",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Credits_MembreId",
                table: "Credits",
                column: "MembreId");

            migrationBuilder.CreateIndex(
                name: "IX_Deboursements_MembreId",
                table: "Deboursements",
                column: "MembreId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailEcritureComptables_CompteComptableId",
                table: "DetailEcritureComptables",
                column: "CompteComptableId");

            migrationBuilder.CreateIndex(
                name: "IX_Echeances_AvanceId",
                table: "Echeances",
                column: "AvanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Echeances_CreditId",
                table: "Echeances",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_Echeances_MembreId",
                table: "Echeances",
                column: "MembreId");

            migrationBuilder.CreateIndex(
                name: "IX_EcritureComptables_MouvementId",
                table: "EcritureComptables",
                column: "MouvementId");

            migrationBuilder.CreateIndex(
                name: "IX_Membres_LieuAffectationId",
                table: "Membres",
                column: "LieuAffectationId");

            migrationBuilder.CreateIndex(
                name: "IX_Membres_PosteId",
                table: "Membres",
                column: "PosteId");

            migrationBuilder.CreateIndex(
                name: "IX_Membres_SexeId",
                table: "Membres",
                column: "SexeId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_AvanceId",
                table: "Mouvements",
                column: "AvanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_CotisationId",
                table: "Mouvements",
                column: "CotisationId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_CreditId",
                table: "Mouvements",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_EcheanceId",
                table: "Mouvements",
                column: "EcheanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_GabaritId",
                table: "Mouvements",
                column: "GabaritId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_MembreId",
                table: "Mouvements",
                column: "MembreId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_CompteComptableId",
                table: "Operations",
                column: "CompteComptableId");

            migrationBuilder.CreateIndex(
                name: "IX_Operations_GabaritId",
                table: "Operations",
                column: "GabaritId");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateurs_MembreId",
                table: "Utilisateurs",
                column: "MembreId",
                unique: true,
                filter: "[MembreId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailEcritureComptables");

            migrationBuilder.DropTable(
                name: "EcritureComptables");

            migrationBuilder.DropTable(
                name: "Operations");

            migrationBuilder.DropTable(
                name: "Parametres");

            migrationBuilder.DropTable(
                name: "Utilisateurs");

            migrationBuilder.DropTable(
                name: "Mouvements");

            migrationBuilder.DropTable(
                name: "CompteComptables");

            migrationBuilder.DropTable(
                name: "Cotisations");

            migrationBuilder.DropTable(
                name: "Echeances");

            migrationBuilder.DropTable(
                name: "Gabarits");

            migrationBuilder.DropTable(
                name: "Mois");

            migrationBuilder.DropTable(
                name: "Avances");

            migrationBuilder.DropTable(
                name: "Credits");

            migrationBuilder.DropTable(
                name: "Deboursements");

            migrationBuilder.DropTable(
                name: "Membres");

            migrationBuilder.DropTable(
                name: "LieuAffectations");

            migrationBuilder.DropTable(
                name: "Postes");

            migrationBuilder.DropTable(
                name: "Sexes");
        }
    }
}
