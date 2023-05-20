using Microsoft.EntityFrameworkCore.Migrations;

namespace AlunosApi.Migrations
{
    public partial class PopulaTabela : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Aluno",
                columns: new[] { "Id", "Email", "Idade", "Nome" },
                values: new object[] { 1, "email@gmail.com", 23, "Jose" });

            migrationBuilder.InsertData(
                table: "Aluno",
                columns: new[] { "Id", "Email", "Idade", "Nome" },
                values: new object[] { 2, "manuela@gmail.com", 22, "Manuela" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Aluno",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Aluno",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
