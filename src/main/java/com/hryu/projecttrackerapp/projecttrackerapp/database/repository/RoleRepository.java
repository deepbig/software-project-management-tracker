package com.hryu.projecttrackerapp.projecttrackerapp.database.repository;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Role;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

  Optional<Role> findById(long id);

  Optional<Role> findByName(String name);

  Boolean existsById(long id);

  Boolean existsByName(String name);

}
