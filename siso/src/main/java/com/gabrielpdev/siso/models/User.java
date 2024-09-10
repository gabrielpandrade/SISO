package com.gabrielpdev.siso.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;



@Entity
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
    public static final String TABLE_NAME = "usuario";

    @Column(name = "id_usuario")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login", unique = true, nullable = false, insertable = true, updatable = false, columnDefinition = "TEXT", length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String username; 

    @Column(name = "senha", unique = false, nullable = false, insertable = true, updatable = true, columnDefinition = "TEXT", length = 100)
    @NotBlank
    @Size(min = 8, max = 100)
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    @Column(name = "email", unique = false, nullable = false, insertable = true, updatable = true, columnDefinition = "TEXT", length = 320)
    @NotBlank
    @Email
    @Size(max = 320)
    private String email;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tipo_usuario", joinColumns = @JoinColumn(name = "id_usuario"))
    @Column(name = "tipo", unique = false, nullable = false, insertable = true, updatable = true)
    private Set<String> profiles = new HashSet<>();

    @Column(name = "ativo", unique = false, nullable = false, insertable = true, updatable = true, columnDefinition = "BOOLEAN")
    private Boolean ativo;

    public void addProfile(String profile) {
        this.profiles.add(profile);
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        User user = (User) o;
        return getId() != null && Objects.equals(getId(), user.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
