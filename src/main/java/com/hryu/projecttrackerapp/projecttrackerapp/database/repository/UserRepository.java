package com.hryu.projecttrackerapp.projecttrackerapp.database.repository;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findById(long id);

  List<User> findByName(String name);

  Boolean existsById(long id);

  Boolean existsByName(String name);
}
