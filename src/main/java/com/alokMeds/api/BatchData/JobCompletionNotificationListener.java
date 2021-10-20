package com.alokMeds.api.BatchData;

import com.alokMeds.api.Publications.PublicationRepo;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Profile("dev")
@Component
@Slf4j
@AllArgsConstructor
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {
  private  PublicationRepo publicationRepo;
  
  @Override
  public void afterJob(JobExecution jobExecution) {
    if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      publicationRepo.findAll()
      .forEach(publication -> log.info("publication inserted"+publication));
    }
  }
}