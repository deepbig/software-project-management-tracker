package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ROLES",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "ROLE_NAME")
    })
@NoArgsConstructor
@Data
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ROLE_ID")
  private long id;

  @Column(name = "ROLE_NAME")
  private String name;

  public Role(String name) {
    this.name = name;
  }
}
