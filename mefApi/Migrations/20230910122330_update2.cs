using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mefapi.Migrations
{
    public partial class update2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Utilisateurs_Membres_MembreId",
                table: "Utilisateurs");

            migrationBuilder.DropIndex(
                name: "IX_Utilisateurs_MembreId",
                table: "Utilisateurs");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Utilisateurs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateurs_MembreId",
                table: "Utilisateurs",
                column: "MembreId",
                unique: true,
                filter: "[MembreId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Utilisateurs_Membres_MembreId",
                table: "Utilisateurs",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Utilisateurs_Membres_MembreId",
                table: "Utilisateurs");

            migrationBuilder.DropIndex(
                name: "IX_Utilisateurs_MembreId",
                table: "Utilisateurs");

            migrationBuilder.AlterColumn<int>(
                name: "MembreId",
                table: "Utilisateurs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Utilisateurs_MembreId",
                table: "Utilisateurs",
                column: "MembreId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Utilisateurs_Membres_MembreId",
                table: "Utilisateurs",
                column: "MembreId",
                principalTable: "Membres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
