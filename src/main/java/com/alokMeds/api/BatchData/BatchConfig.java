package com.alokMeds.api.BatchData;


import javax.sql.DataSource;

import com.alokMeds.api.Publications.Publications;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
@Profile("dev")
@Configuration
public class BatchConfig {

  @Autowired
  public JobBuilderFactory jobBuilderFactory;

  @Autowired
  public StepBuilderFactory stepBuilderFactory;
  @Bean
  public FlatFileItemReader<Publications> reader() {
    return new FlatFileItemReaderBuilder<Publications>()
      .name("personItemReader")
      .resource(new ClassPathResource("publication-data.csv"))
      .delimited()
      .names("id","name","author","link")
      .fieldSetMapper(new BeanWrapperFieldSetMapper<Publications>() {{
        setTargetType(Publications.class);
      }})
      .build();
  }
  
  @Bean
  public PublicationProcessor processor() {
    return new PublicationProcessor();
  }
  
  @Bean
  public JdbcBatchItemWriter<Publications> writer(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<Publications>()
      .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
      .sql("INSERT INTO publ_tbl (id,name,author,link) VALUES (:id,:name,:author,:link)")
      .dataSource(dataSource)
      .build();
  }
  @Bean
public Job importUserJob(JobCompletionNotificationListener listener, Step step1) {
  return jobBuilderFactory.get("importUserJob")
    .incrementer(new RunIdIncrementer())
    .listener(listener)
    .flow(step1)
    .end()
    .build();
}

@Bean
public Step step1(JdbcBatchItemWriter<Publications> writer) {
  return stepBuilderFactory.get("step1")
    .<Publications, Publications> chunk(10)
    .reader(reader())
    .processor(processor())
    .writer(writer)
    .build();
}
}