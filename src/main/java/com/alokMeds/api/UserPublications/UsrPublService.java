package com.alokMeds.api.UserPublications;

import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;
import com.alokMeds.api.security.JwtUtil;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UsrPublService {
    private UserRepository userRepository;
    private PublicationRepo publicationRepo;
    private JwtUtil jwtUtil;

    public void add(String token, Long publicationId) {
        if(!jwtUtil.validateToken(token))return;
        String uuid=(String)jwtUtil.extractClaim(token,i->i.get("uuid"));
        User user=userRepository.findByUuid(uuid);
        Publications publ=publicationRepo.findById(publicationId).get();
        UserPublication publications=new UserPublication();
        publications.setPublication(publ);
        publications.setStage(Stage.STARTED);
        publications.setUser(user);
        user.getUserPublications().add(publications);
        userRepository.save(user);
    }
}
