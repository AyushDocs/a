package com.alokMeds.api.BatchData;

import com.alokMeds.api.Publications.Publications;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Profile;
@Profile("dev")
public class PublicationProcessor implements ItemProcessor<Publications, Publications> {
  @Override
  public Publications process(final Publications publications) throws Exception {
    return publications;
  }
}