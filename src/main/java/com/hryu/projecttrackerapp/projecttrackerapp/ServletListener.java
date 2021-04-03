package com.hryu.projecttrackerapp.projecttrackerapp;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Role;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.RoleRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.WebApplicationContextUtils;

@WebListener
public class ServletListener implements ServletContextListener {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoleRepository roleRepository;

  @Override
  public void contextInitialized(ServletContextEvent sce) {

    WebApplicationContextUtils.getRequiredWebApplicationContext(sce.getServletContext())
        .getAutowireCapableBeanFactory().autowireBean(this);

    List<User> user = userRepository.findByName("Hongsuk Ryu");
    if (user.isEmpty()) {
      User new_user = new User("Hongsuk Ryu");
      userRepository.save(new_user);
    }

    Optional<Role> role = roleRepository.findByName("Project Manager");
    if (!role.isPresent()) {
      Role new_role = new Role("Project Manager");
      roleRepository.save(new_role);
    }
    System.out.println("Context Started");

  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
    System.out.println("Context Destroyed");
  }
}
