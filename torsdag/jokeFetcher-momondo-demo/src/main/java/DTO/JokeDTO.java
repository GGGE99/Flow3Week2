/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DTO;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import utils.HttpUtils;
import utils.JokeFinder;
import webscraper.TagCounter;


/**
 *
 * @author marcg
 */
public class JokeDTO {

    private static Gson GSON = new Gson();

    private String joke1;
    private String joke1Reference;
    private String joke2;
    private String joke2Reference;

    public JokeDTO(String url1, String url2, ExecutorService es) throws IOException, InterruptedException, ExecutionException, TimeoutException {
        List<JokeFinder> urls = new ArrayList();
        urls.add(new JokeFinder(url1));
        urls.add(new JokeFinder(url2));

        List<Future<String>> futures = new ArrayList();

        for (JokeFinder jf : urls) {
            JokeHandler jh = new JokeHandler(jf);
            futures.add(es.submit(jh));
        }
        
        List<String> results = new ArrayList();
        for (Future<String> f : futures) {
            results.add(f.get(10, TimeUnit.SECONDS));
            System.out.println(f.get());
        }

        this.joke1 = GSON.fromJson(results.get(0), JsonObject.class).get("value").toString();
        this.joke1Reference = url1;
        this.joke2 = GSON.fromJson(results.get(1), JsonObject.class).get("joke").toString();
        this.joke2Reference = url2;
    }

}

class JokeHandler implements Callable<String> {

    JokeFinder tc;

    JokeHandler(JokeFinder tc) {
        this.tc = tc;
    }

    @Override
    public String call() throws Exception {
        tc.get();
        return new String(tc.getJson());
    }
}
