package com.hryu.projecttrackerapp.projecttrackerapp.database.repository;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Requirement;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement, Long> {

  Optional<Requirement> findById(long id);

  List<Requirement> findByTitle(String title);

  List<Requirement> findByProject(Project project);

  Boolean existsById(long id);

  Boolean existsByTitle(String title);
}
