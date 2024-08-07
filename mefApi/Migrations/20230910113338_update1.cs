#nullable disable

namespace mefapi.Migrations
{
    public partial class update1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deboursements_Avances_AvanceId",
                table: "Deboursements");

            migrationBuilder.DropForeignKey(
                name: "FK_Deboursements_Credits_CreditId",
                table: "Deboursements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_EcheanceAvance_EcheanceAvanceId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_EcheanceCredit_EcheanceCreditId",
                table: "Mouvements");

            migrationBuilder.DropTable(
                name: "AvancesDebourses");

            migrationBuilder.DropTable(
                name: "CreditDebourse");

            migrationBuilder.DropTable(
                name: "EcheanceAvance");

            migrationBuilder.DropTable(
                name: "EcheanceCredit");

            migrationBuilder.DropIndex(
                name: "IX_Mouvements_EcheanceAvanceId",
                table: "Mouvements");

            migrationBuilder.DropIndex(
                name: "IX_Mouvements_EcheanceCreditId",
                table: "Mouvements");

            migrationBuilder.DropIndex(
                name: "IX_Deboursements_AvanceId",
                table: "Deboursements");

            migrationBuilder.DropIndex(
                name: "IX_Deboursements_CreditId",
                table: "Deboursements");

            migrationBuilder.DropColumn(
                name: "EcheanceAvanceId",
                table: "Mouvements");

            migrationBuilder.DropColumn(
                name: "EcheanceCreditId",
                table: "Mouvements");

            migrationBuilder.DropColumn(
                name: "AvanceId",
                table: "Deboursements");

            migrationBuilder.DropColumn(
                name: "CreditId",
                table: "Deboursements");

            migrationBuilder.AddColumn<int>(
                name: "DeboursementId",
                table: "Credits",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeboursementId",
                table: "Avances",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Credits_DeboursementId",
                table: "Credits",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Avances_DeboursementId",
                table: "Avances",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Avances_Deboursements_DeboursementId",
                table: "Avances",
                column: "DeboursementId",
                principalTable: "Deboursements",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Credits_Deboursements_DeboursementId",
                table: "Credits",
                column: "DeboursementId",
                principalTable: "Deboursements",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Avances_Deboursements_DeboursementId",
                table: "Avances");

            migrationBuilder.DropForeignKey(
                name: "FK_Credits_Deboursements_DeboursementId",
                table: "Credits");

            migrationBuilder.DropIndex(
                name: "IX_Credits_DeboursementId",
                table: "Credits");

            migrationBuilder.DropIndex(
                name: "IX_Avances_DeboursementId",
                table: "Avances");

            migrationBuilder.DropColumn(
                name: "DeboursementId",
                table: "Credits");

            migrationBuilder.DropColumn(
                name: "DeboursementId",
                table: "Avances");

            migrationBuilder.AddColumn<int>(
                name: "EcheanceAvanceId",
                table: "Mouvements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EcheanceCreditId",
                table: "Mouvements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AvanceId",
                table: "Deboursements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreditId",
                table: "Deboursements",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AvancesDebourses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvanceId = table.Column<int>(type: "int", nullable: false),
                    MouvementId = table.Column<int>(type: "int", nullable: false),
                    DateDecaissement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: false),
                    MontantApprouve = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NombreEcheancesApprouve = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvancesDebourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvancesDebourses_Avances_AvanceId",
                        column: x => x.AvanceId,
                        principalTable: "Avances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AvancesDebourses_Mouvements_MouvementId",
                        column: x => x.MouvementId,
                        principalTable: "Mouvements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CreditDebourse",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditId = table.Column<int>(type: "int", nullable: false),
                    MouvementId = table.Column<int>(type: "int", nullable: false),
                    DateDecaissement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DureeAccordee = table.Column<int>(type: "int", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: false),
                    MontantAccorde = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MontantCommission = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MontantInteret = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreditDebourse", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CreditDebourse_Credits_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CreditDebourse_Mouvements_MouvementId",
                        column: x => x.MouvementId,
                        principalTable: "Mouvements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EcheanceAvance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvanceId = table.Column<int>(type: "int", nullable: false),
                    DateEcheance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: false),
                    MontantEcheance = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EcheanceAvance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EcheanceAvance_Avances_AvanceId",
                        column: x => x.AvanceId,
                        principalTable: "Avances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EcheanceCredit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditId = table.Column<int>(type: "int", nullable: false),
                    Capital = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DateEcheance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Interet = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ModifieLe = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiePar = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EcheanceCredit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EcheanceCredit_Credits_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_EcheanceAvanceId",
                table: "Mouvements",
                column: "EcheanceAvanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_EcheanceCreditId",
                table: "Mouvements",
                column: "EcheanceCreditId");

            migrationBuilder.CreateIndex(
                name: "IX_Deboursements_AvanceId",
                table: "Deboursements",
                column: "AvanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Deboursements_CreditId",
                table: "Deboursements",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_AvancesDebourses_AvanceId",
                table: "AvancesDebourses",
                column: "AvanceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AvancesDebourses_MouvementId",
                table: "AvancesDebourses",
                column: "MouvementId");

            migrationBuilder.CreateIndex(
                name: "IX_CreditDebourse_CreditId",
                table: "CreditDebourse",
                column: "CreditId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CreditDebourse_MouvementId",
                table: "CreditDebourse",
                column: "MouvementId");

            migrationBuilder.CreateIndex(
                name: "IX_EcheanceAvance_AvanceId",
                table: "EcheanceAvance",
                column: "AvanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EcheanceCredit_CreditId",
                table: "EcheanceCredit",
                column: "CreditId");

            migrationBuilder.AddForeignKey(
                name: "FK_Deboursements_Avances_AvanceId",
                table: "Deboursements",
                column: "AvanceId",
                principalTable: "Avances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Deboursements_Credits_CreditId",
                table: "Deboursements",
                column: "CreditId",
                principalTable: "Credits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_EcheanceAvance_EcheanceAvanceId",
                table: "Mouvements",
                column: "EcheanceAvanceId",
                principalTable: "EcheanceAvance",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_EcheanceCredit_EcheanceCreditId",
                table: "Mouvements",
                column: "EcheanceCreditId",
                principalTable: "EcheanceCredit",
                principalColumn: "Id");
        }
    }
}
