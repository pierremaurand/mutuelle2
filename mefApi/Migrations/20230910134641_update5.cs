#nullable disable

namespace mefapi.Migrations
{
    public partial class update5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Deboursements_Mouvements_MouvementId",
                table: "Deboursements");

            migrationBuilder.DropIndex(
                name: "IX_Deboursements_MouvementId",
                table: "Deboursements");

            migrationBuilder.DropColumn(
                name: "MouvementId",
                table: "Deboursements");

            migrationBuilder.AddColumn<int>(
                name: "DeboursementId",
                table: "Mouvements",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                unique: true,
                filter: "[DeboursementId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Deboursements_DeboursementId",
                table: "Mouvements",
                column: "DeboursementId",
                principalTable: "Deboursements",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Deboursements_DeboursementId",
                table: "Mouvements");

            migrationBuilder.DropIndex(
                name: "IX_Mouvements_DeboursementId",
                table: "Mouvements");

            migrationBuilder.DropColumn(
                name: "DeboursementId",
                table: "Mouvements");

            migrationBuilder.AddColumn<int>(
                name: "MouvementId",
                table: "Deboursements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Deboursements_MouvementId",
                table: "Deboursements",
                column: "MouvementId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Deboursements_Mouvements_MouvementId",
                table: "Deboursements",
                column: "MouvementId",
                principalTable: "Mouvements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
