package com.hryu.projecttrackerapp.projecttrackerapp.rest.service;

import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Member;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.MemberOnly;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Project;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.Role;
import com.hryu.projecttrackerapp.projecttrackerapp.database.entity.User;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.MemberRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.ProjectRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.RoleRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.database.repository.UserRepository;
import com.hryu.projecttrackerapp.projecttrackerapp.error.ServerException;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.MemberDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.dto.PageDto;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.mapper.ModelMapper;
import com.hryu.projecttrackerapp.projecttrackerapp.rest.response.ErrorCode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {

  private static final Logger logger = LoggerFactory.getLogger(TeamService.class);

  private final MemberRepository memberRepository;
  private final ProjectRepository projectRepository;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public TeamService(ProjectRepository projectRepository, MemberRepository memberRepository,
      UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper) {
    this.memberRepository = memberRepository;
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.modelMapper = modelMapper;
  }

  public PageDto<MemberDto> listMember(long project_id, int offset, int limit)
      throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);

    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] is not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_GET_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    PageDto<MemberDto> ret = new PageDto<>();

    List<Member> members = memberRepository.findByProject(project.get());

//    List<MemberOnly> memberWithoutProject = memberRepository
//        .findIdAndUsernameAndRoleNameByProject(project_id);

    if (members.size() > 0) {
      List<MemberDto> listDto = new ArrayList<>();
      for (Member member : members) {
        MemberDto memberDto = modelMapper.from(member);
        listDto.add(memberDto);
      }
      ret.setList(listDto);
      ret.setOffset(offset);
      ret.setSize(members.size());
      ret.setTotal(offset + members.size());
    }

    return ret;
  }

  public PageDto<User> listUser(int offset, int limit) throws ServerException {

    PageDto<User> ret = new PageDto<>();

    List<User> users = userRepository.findAll();

    if (users.size() > 0) {
      ret.setList(users);
      ret.setOffset(offset);
      ret.setSize(users.size());
      ret.setTotal(offset + users.size());
    }

    return ret;
  }

  public PageDto<Role> listRole(int offset, int limit) throws ServerException {

    PageDto<Role> ret = new PageDto<>();

    List<Role> roles = roleRepository.findAll();

    if (roles.size() > 0) {
      ret.setList(roles);
      ret.setOffset(offset);
      ret.setSize(roles.size());
      ret.setTotal(offset + roles.size());
    }

    return ret;
  }

  @Transactional
  public void createMember(long project_id, MemberDto dto) throws ServerException {

    Optional<Project> project = projectRepository.findById(project_id);
    if (!project.isPresent()) {
      logger.error(
          "The project id [{}] does not exist.", project_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_PROJECT_NOT_EXIST);
      throw se;
    }

    if (!userRepository.existsByName(dto.getUsername())) {
      logger.error(
          "The user's name [{}] does not exist.", dto.getUsername());
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_USER_NOT_EXIST);
      throw se;
    }

    if (!roleRepository.existsByName(dto.getRolename())) {
      logger.error(
          "The role's name [{}] does not exist.", dto.getUsername());
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_CREATE_BY_USER_NOT_EXIST);
      throw se;
    }

    Member member = new Member();
    member.setUsername(dto.getUsername());
    member.setRolename(dto.getRolename());
    member.setProject(project.get());
    memberRepository.save(member);
  }

  @Transactional
  public void deleteMember(long member_id) throws ServerException {

    if (logger.isInfoEnabled()) {
      logger.info("Delete selected member id [{}]", member_id);
    }

    if (memberRepository.existsById(member_id) == false) {
      logger.error(
          "The member id [{}] cannot be found.",
          member_id);
      ServerException se =
          new ServerException(ErrorCode.FAIL_MEMBER_DELETE_BY_ID_NOT_FOUND);
      throw se;
    }
    memberRepository.deleteById(member_id);

    if (logger.isInfoEnabled()) {
      logger.info("Success to delete an member[{}]", member_id);
    }
  }

  @Transactional
  public void createUser(String name)
      throws ServerException {

    if (userRepository.existsByName(name)) {
      logger.error(
          "The user's name [{}] already exist.", name);
      ServerException se =
          new ServerException(ErrorCode.FAIL_USER_CREATE_BY_NAME_ALREADY_EXIST);
      throw se;
    }

    User user = new User();
    user.setName(name);
    userRepository.save(user);
  }

  @Transactional
  public void createRole(String name)
      throws ServerException {

    if (roleRepository.existsByName(name)) {
      logger.error(
          "The role's name [{}] already exist.", name);
      ServerException se =
          new ServerException(ErrorCode.FAIL_ROLE_CREATE_BY_NAME_ALREADY_EXIST);
      throw se;
    }

    Role role = new Role();
    role.setName(name);
    roleRepository.save(role);
  }

}
