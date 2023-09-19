using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mefapi.Migrations
{
    public partial class updateDebEche : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deboursements_Membres_MembreId",
                table: "Deboursements");

            migrationBuilder.DropForeignKey(
                name: "FK_Echeances_Membres_MembreId",
                table: "Echeances");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Echeances",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "MontantInteret",
                table: "Deboursements",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "MontantCommission",
                table: "Deboursements",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Deboursements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Deboursements_Membres_MembreId",
                table: "Deboursements",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Echeances_Membres_MembreId",
                table: "Echeances",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deboursements_Membres_MembreId",
                table: "Deboursements");

            migrationBuilder.DropForeignKey(
                name: "FK_Echeances_Membres_MembreId",
                table: "Echeances");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Echeances",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "MontantInteret",
                table: "Deboursements",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "MontantCommission",
                table: "Deboursements",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Deboursements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Deboursements_Membres_MembreId",
                table: "Deboursements",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Echeances_Membres_MembreId",
                table: "Echeances",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id");
        }
    }
}
