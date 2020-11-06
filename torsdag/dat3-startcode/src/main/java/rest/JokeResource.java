package rest;

import DTO.JokeDTO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeoutException;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("jokes")
public class JokeResource {
    private static Gson GSON = new Gson();
    private static ExecutorService es = Executors.newCachedThreadPool();

    @Context
    private UriInfo context;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("user")
    public String getJokes() throws IOException, InterruptedException, ExecutionException, TimeoutException {

       JokeDTO joke = new JokeDTO("https://api.chucknorris.io/jokes/random", "https://icanhazdadjoke.com", es);
 
        return GSON.toJson(joke);
    }

}
