package com.hryu.projecttrackerapp.projecttrackerapp.database.entity;

import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PROJECTS")
@NoArgsConstructor
@Data
public class Project {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "PROJECT_ID")
  private long id;

  @Column(name = "PROJECT_NAME")
  private String name;

  @Column(name = "PROJECT_DESCRIPTION")
  private String description;

  @ManyToOne
  @JoinColumn(name = "USER_ID")
  private User manager;

  @Temporal(TemporalType.DATE)
  @Column(name="LAST_MODIFIED")
  private Date lastModified;

}
