package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@Entity
@Table(name = Fornecedor.TABE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Fornecedor {
    public static final String TABE_NAME = "fornecedor";

    @Column(name = "id_fornecedor")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", unique = true, nullable = false)
    @NotBlank
    private String nome;

    @Column(name = "fone", nullable = false, length = 11)
    @NotBlank
    @Size(min = 11, max = 11)
    private String fone;

    @Column(name = "endereco", nullable = false)
    @NotBlank
    private String endereco;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Fornecedor that = (Fornecedor) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
