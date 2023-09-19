using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mefapi.Migrations
{
    public partial class update7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deboursements_Mouvements_MouvementId",
                table: "Deboursements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Avances_AvanceId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Cotisations_CotisationId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Credits_CreditId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Echeances_EcheanceId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Membres_MembreId",
                table: "Mouvements");

            migrationBuilder.DropIndex(
                name: "IX_Deboursements_MouvementId",
                table: "Deboursements");

            migrationBuilder.DropColumn(
                name: "MouvementId",
                table: "Deboursements");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GabaritId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EcheanceId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CreditId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CotisationId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AvanceId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DeboursementId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Avances_AvanceId",
                table: "Mouvements",
                column: "AvanceId",
                principalTable: "Avances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Cotisations_CotisationId",
                table: "Mouvements",
                column: "CotisationId",
                principalTable: "Cotisations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Credits_CreditId",
                table: "Mouvements",
                column: "CreditId",
                principalTable: "Credits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Deboursements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                principalTable: "Deboursements",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Echeances_EcheanceId",
                table: "Mouvements",
                column: "EcheanceId",
                principalTable: "Echeances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements",
                column: "GabaritId",
                principalTable: "Gabarits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Membres_MembreId",
                table: "Mouvements",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Avances_AvanceId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Cotisations_CotisationId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Credits_CreditId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Deboursements_DeboursementId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Echeances_EcheanceId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements");

            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Membres_MembreId",
                table: "Mouvements");

            migrationBuilder.DropIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements");

            migrationBuilder.DropColumn(
                name: "DeboursementId",
                table: "Mouvements");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "GabaritId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EcheanceId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CreditId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CotisationId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "AvanceId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "MouvementId",
                table: "Deboursements",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deboursements_MouvementId",
                table: "Deboursements",
                column: "MouvementId",
                unique: true,
                filter: "[MouvementId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Deboursements_Mouvements_MouvementId",
                table: "Deboursements",
                column: "MouvementId",
                principalTable: "Mouvements",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Avances_AvanceId",
                table: "Mouvements",
                column: "AvanceId",
                principalTable: "Avances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Cotisations_CotisationId",
                table: "Mouvements",
                column: "CotisationId",
                principalTable: "Cotisations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Credits_CreditId",
                table: "Mouvements",
                column: "CreditId",
                principalTable: "Credits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Echeances_EcheanceId",
                table: "Mouvements",
                column: "EcheanceId",
                principalTable: "Echeances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements",
                column: "GabaritId",
                principalTable: "Gabarits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Membres_MembreId",
                table: "Mouvements",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id");
        }
    }
}
