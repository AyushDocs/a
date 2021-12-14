package com.alokMeds.api.schedulers;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

import com.alokMeds.api.Query.QueryRepository;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class DeleteQuery {
    private QueryRepository queryRepository;
    @Scheduled(fixedDelay = 7,initialDelay = 1,timeUnit = TimeUnit.DAYS)
    public void deleteQueriesOlderThanAMonth() {
        queryRepository.deleteAll(queryRepository.findAll().parallelStream()
                .filter(query -> query.getDate().plus(Duration.ofDays(30)).isAfter(LocalDateTime.now())).toList());
    }
}
