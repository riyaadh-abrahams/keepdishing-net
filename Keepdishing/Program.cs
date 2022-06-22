using Keepdishing.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AspNetCore.Proxy;
using dotenv.net;
using Npgsql;
using Serilog;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Keepdishing.Model;

/**
 * Load environment variables from .env file
 */
DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, logConfiguration) =>
{
    logConfiguration.WriteTo.Console();
});

/**
 * We should only allow HTTP 1.1 during development or else we will get warnings
 * when we proxy to the NextJS server
 */
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    if (builder.Environment.IsDevelopment())
    {
        serverOptions.ConfigureEndpointDefaults(lo => lo.Protocols = HttpProtocols.Http1);
    }
});


builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    var sb = new NpgsqlConnectionStringBuilder(connectionString)
    {
        Host = Environment.GetEnvironmentVariable("DB_HOST"),
        Username = Environment.GetEnvironmentVariable("DB_USER"),
        Password = Environment.GetEnvironmentVariable("DB_PASS"),
        Database = Environment.GetEnvironmentVariable("DB_NAME")
    };

    options.UseNpgsql(sb.ToString());
});

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddDefaultIdentity<ApplicationUser>().AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProxies();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStaticFiles();
app.UseRouting();

//Add Header to API Requests so that we return 401 instead of redirecting to login page 
app.Use(async (context, next) =>
{
    if (context.Request.Path.Value.StartsWith("/api"))
    {
        context.Request.Headers.Add("X-Requested-With", "XMLHttpRequest");
    }
    await next();
});

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
    endpoints.MapControllers();
});

app.Use(async (context, next) =>
{
    if (context.Request.Path.Value.StartsWith("/app"))
    {
        if (!context.User.Identity.IsAuthenticated)
        {
            context.Response.Redirect("/auth/login");
            return;
        }
    }
    await next();
});

/**
 * Proxy Requests to the NextJS Server if no API or MVC Routes has been matched at this point
 * Include some error handling. If the Frontend Server is not running then show an error page
 */
app.RunProxy(proxy => proxy.UseHttp(
    Environment.GetEnvironmentVariable("FRONTEND_URL"),
    builder =>
    {
        builder.WithHandleFailure(async (c, e) =>
        {
            c.Response.StatusCode = 403;
            await c.Response.WriteAsync("Things borked.");
        });
    }
));

app.Run();
