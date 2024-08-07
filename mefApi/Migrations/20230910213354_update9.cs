#nullable disable

namespace mefapi.Migrations
{
    public partial class update9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements");

            migrationBuilder.AlterColumn<int>(
                name: "GabaritId",
                table: "Mouvements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements",
                column: "GabaritId",
                principalTable: "Gabarits",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements");

            migrationBuilder.AlterColumn<int>(
                name: "GabaritId",
                table: "Mouvements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Mouvements_Gabarits_GabaritId",
                table: "Mouvements",
                column: "GabaritId",
                principalTable: "Gabarits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
