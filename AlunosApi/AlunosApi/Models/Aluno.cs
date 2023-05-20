using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlunosApi.Models
{
    [Table("Aluno")]
    public class Aluno
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(80)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(80)]
        public string Email { get; set; }

        [Required]
        public int Idade { get; set; }
    }
}
