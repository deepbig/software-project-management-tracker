package com.hryu.projecttrackerapp.projecttrackerapp.database.repository;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.TotalPersonHour;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalPersonHourRepository extends JpaRepository<TotalPersonHour, Long> {

  Optional<TotalPersonHour> findById(long id);

  List<TotalPersonHour> findByProject(Project project);

  Boolean existsById(long id);

  void deleteByProject(Project project);

}
