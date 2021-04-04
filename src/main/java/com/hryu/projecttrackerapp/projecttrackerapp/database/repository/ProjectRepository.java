package com.hryu.projecttrackerapp.projecttrackerapp.database.repository;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.ProjectSummary;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.SummaryProjectDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

  Optional<Project> findById(long id);

  Optional<Project> findByName(String name);

  Boolean existsByName(String name);

//  @Query(value =
//      "SELECT p.PROJECT_ID as Id, p.PROJECT_NAME as Name, u.USER_NAME as ProjectManager, t.TOTAL_PERSON_HOURS_TOTAL as TotalPersonHours, p.LAST_MODIFIED as LastModified "
//          + "FROM PROJECTS p "
//          + "INNER JOIN USERS u ON p.USER_ID=u.USER_ID "
//          + "LEFT JOIN TOTAL_PERSON_HOURS t ON p.TOTAL_PERSON_HOURS_ID=t.TOTAL_PERSON_HOURS_ID", nativeQuery = true)
@Query(value =
    "SELECT p.PROJECT_ID as Id, p.PROJECT_NAME as Name, p.PROJECT_DESCRIPTION as Description,  u.USER_NAME as ProjectManager, p.LAST_MODIFIED as LastModified "
        + "FROM PROJECTS p "
        + "INNER JOIN USERS u ON p.USER_ID=u.USER_ID", nativeQuery = true)
  List<ProjectSummary> findSummaryProjectList();

}