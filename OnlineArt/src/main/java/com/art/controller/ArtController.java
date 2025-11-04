package com.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.art.model.Art;
import com.art.service.ArtService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/artapi")
@CrossOrigin(origins = "*") // allows frontend requests
public class ArtController {

    @Autowired
    private ArtService artService;

    @GetMapping("/")
    public String home() {
        return "Art Home Page";
    }

    @PostMapping("/add")
    public Art addArt(@RequestBody Art art) {
        return artService.addArt(art);
    }

    @GetMapping("/view")
    public List<Art> viewArt() {
        return artService.viewArt();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteArt(@PathVariable Integer id) {
        return artService.deleteArt(id);
    }
    
    @PutMapping("/update")
    public String updateArt(@RequestBody Art art) {
        //TODO: process PUT request
        
        return artService.updateArt(art);
    }
}
