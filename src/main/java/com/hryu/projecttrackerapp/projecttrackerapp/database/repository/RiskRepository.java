package com.hryu.projecttrackerapp.projecttrackerapp.database.repository;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Risk;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long> {
  Optional<Risk> findById(long id);

  List<Risk> findByName(String name);

  List<Risk> findByProject(Project project);

  Boolean existsById(long id);

  Boolean existsByName(String name);
}
