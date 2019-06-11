using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Sp_Medical_Group_Context : DbContext
    {
        public Sp_Medical_Group_Context()
        {
        }

        public Sp_Medical_Group_Context(DbContextOptions<Sp_Medical_Group_Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Clinica> Clinica { get; set; }
        public virtual DbSet<Consulta> Consulta { get; set; }
        public virtual DbSet<Especialidades> Especialidades { get; set; }
        public virtual DbSet<Medico> Medico { get; set; }
        public virtual DbSet<Prontuarios> Prontuarios { get; set; }
        public virtual DbSet<StatusConsulta> StatusConsulta { get; set; }
        public virtual DbSet<TiposUsuarios> TiposUsuarios { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress; Initial Catalog= SENAI_SP_MEDICAL_GROUP;User ID=sa;Password=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clinica>(entity =>
            {
                entity.ToTable("CLINICA");

                entity.HasIndex(e => e.Cnpj)
                    .HasName("UQ__CLINICA__AA57D6B4E397F480")
                    .IsUnique();

                entity.HasIndex(e => e.Endereco)
                    .HasName("UQ__CLINICA__AF82008DFF20E099")
                    .IsUnique();

                entity.HasIndex(e => e.RazaoSocial)
                    .HasName("UQ__CLINICA__10D918D97E916FD0")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasColumnName("CNPJ")
                    .HasMaxLength(18)
                    .IsUnicode(false);

                entity.Property(e => e.Endereco)
                    .IsRequired()
                    .HasColumnName("ENDERECO")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.HorarioDeAtendimento)
                    .IsRequired()
                    .HasColumnName("HORARIO_DE_ATENDIMENTO")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.RazaoSocial)
                    .IsRequired()
                    .HasColumnName("RAZAO_SOCIAL")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Consulta>(entity =>
            {
                entity.ToTable("CONSULTA");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DataAgendamento)
                    .HasColumnName("DATA_AGENDAMENTO")
                    .HasColumnType("datetime");

                entity.Property(e => e.Descricao)
                    .HasColumnName("DESCRICAO")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.IdMedico).HasColumnName("ID_MEDICO");

                entity.Property(e => e.IdProntuario).HasColumnName("ID_PRONTUARIO");

                entity.Property(e => e.IdStatus).HasColumnName("ID_STATUS");

                entity.HasOne(d => d.IdMedicoNavigation)
                    .WithMany(p => p.Consulta)
                    .HasForeignKey(d => d.IdMedico)
                    .HasConstraintName("FK__CONSULTA__ID_MED__03F0984C");

                entity.HasOne(d => d.IdProntuarioNavigation)
                    .WithMany(p => p.Consulta)
                    .HasForeignKey(d => d.IdProntuario)
                    .HasConstraintName("FK__CONSULTA__ID_PRO__04E4BC85");

                entity.HasOne(d => d.IdStatusNavigation)
                    .WithMany(p => p.Consulta)
                    .HasForeignKey(d => d.IdStatus)
                    .HasConstraintName("FK__CONSULTA__ID_STA__05D8E0BE");
            });

            modelBuilder.Entity<Especialidades>(entity =>
            {
                entity.ToTable("ESPECIALIDADES");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Especialidade)
                    .IsRequired()
                    .HasColumnName("ESPECIALIDADE")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Medico>(entity =>
            {
                entity.ToTable("MEDICO");

                entity.HasIndex(e => e.Crm)
                    .HasName("UQ__MEDICO__C1F887FF59FEF1B3")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Crm)
                    .IsRequired()
                    .HasColumnName("CRM")
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.IdClinica).HasColumnName("ID_CLINICA");

                entity.Property(e => e.IdEspecialidade).HasColumnName("ID_ESPECIALIDADE");

                entity.Property(e => e.IdUsuario).HasColumnName("ID_USUARIO");

                entity.HasOne(d => d.IdClinicaNavigation)
                    .WithMany(p => p.Medico)
                    .HasForeignKey(d => d.IdClinica)
                    .HasConstraintName("FK__MEDICO__ID_CLINI__6A30C649");

                entity.HasOne(d => d.IdEspecialidadeNavigation)
                    .WithMany(p => p.Medico)
                    .HasForeignKey(d => d.IdEspecialidade)
                    .HasConstraintName("FK__MEDICO__ID_ESPES__693CA210");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Medico)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__MEDICO__ID_USUAR__6B24EA82");
            });

            modelBuilder.Entity<Prontuarios>(entity =>
            {
                entity.ToTable("PRONTUARIOS");

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__PRONTUAR__C1F89731CD630CA7")
                    .IsUnique();

                entity.HasIndex(e => e.Endereco)
                    .HasName("UQ__PRONTUAR__AF82008D2E3183DB")
                    .IsUnique();

                entity.HasIndex(e => e.Rg)
                    .HasName("UQ__PRONTUAR__321537C85757BDDC")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("CPF")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DataNacimento)
                    .HasColumnName("DATA_NACIMENTO")
                    .HasColumnType("date");

                entity.Property(e => e.Endereco)
                    .IsRequired()
                    .HasColumnName("ENDERECO")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.IdUsuario).HasColumnName("ID_USUARIO");

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasColumnName("RG")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Telefone)
                    .IsRequired()
                    .HasColumnName("TELEFONE")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Prontuarios)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__PRONTUARI__ID_US__628FA481");
            });

            modelBuilder.Entity<StatusConsulta>(entity =>
            {
                entity.ToTable("STATUS_CONSULTA");

                entity.HasIndex(e => e.TipoConsulta)
                    .HasName("UQ__STATUS_C__7FDE8B83ADB1EB02")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.TipoConsulta)
                    .IsRequired()
                    .HasColumnName("TIPO_CONSULTA")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TiposUsuarios>(entity =>
            {
                entity.ToTable("TIPOS_USUARIOS");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasColumnName("TIPO")
                    .HasMaxLength(250)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.ToTable("USUARIOS");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__USUARIOS__161CF7249E0EB34E")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.IdTipoUsuario).HasColumnName("ID_TIPO_USUARIO");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("NOME")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasColumnName("SENHA")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__USUARIOS__ID_TIP__5BE2A6F2");
            });
        }
    }
}
