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
import lombok.Data;

@Entity
@Table(name = "MEMBERS")
@Data
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "MEMBER_ID")
  private long id;

  @Column(name = "USERNAME")
  private String username;

  @Column(name = "ROLENAME")
  private String rolename;

  @ManyToOne
  @JoinColumn(name="PROJECT_ID")
  private Project project;

}
