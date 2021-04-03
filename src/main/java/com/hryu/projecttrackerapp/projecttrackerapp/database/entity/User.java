package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "USERS",
    uniqueConstraints = {
    @UniqueConstraint(columnNames = "USER_NAME")
})
@NoArgsConstructor
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "USER_ID")
  private long id;

  @Column(name = "USER_NAME")
  private String name;

  public User(String name) {
    this.name = name;
  }
}
