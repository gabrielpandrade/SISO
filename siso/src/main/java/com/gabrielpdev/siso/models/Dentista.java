package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Entity
@Table(name = Dentista.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Dentista {
    public static final String TABLE_NAME = "dentista";




    @Column(name = "id_dentista")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    @NotBlank
    @Size(min = 2, max = 50)
    private String nome;

    @Column(name = "CPF")
    @NotBlank
    @Size(min = 11, max = 11)
    private String cpf;

    @Column(name = "CRO")
    @NotBlank
    @Size(min = 11, max = 11)
    private String cro;

    @Column(name = "fone", nullable = false, length = 11)
    @NotBlank
    @Size(min = 11, max = 11)
    private String fone;

    @Column(name = "percentual_recebido")
    @NotNull
    @Positive
    private Double percentualRecebido;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Dentista dentista = (Dentista) o;
        return getId() != null && Objects.equals(getId(), dentista.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
