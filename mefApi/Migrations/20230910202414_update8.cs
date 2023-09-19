using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mefapi.Migrations
{
    public partial class update8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements");

            migrationBuilder.AlterColumn<int>(
                name: "EcheanceId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DeboursementId",
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

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

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

            migrationBuilder.DropIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements");

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
                name: "DeboursementId",
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
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Cotisations_CotisationId",
                table: "Mouvements",
                column: "CotisationId",
                principalTable: "Cotisations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Credits_CreditId",
                table: "Mouvements",
                column: "CreditId",
                principalTable: "Credits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Deboursements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                principalTable: "Deboursements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Echeances_EcheanceId",
                table: "Mouvements",
                column: "EcheanceId",
                principalTable: "Echeances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
