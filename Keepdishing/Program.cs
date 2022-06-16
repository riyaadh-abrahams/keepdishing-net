using Keepdishing.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AspNetCore.Proxy;
using dotenv.net;
using Npgsql;


#region Builder

DotEnv.Load();

var frontendHost = Environment.GetEnvironmentVariable("FRONTEND_HOST");
var frontendPort = Environment.GetEnvironmentVariable("FRONTEND_PORT");
var frontendUrl = $"http://{frontendHost}:{frontendPort}/";

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddDefaultIdentity<IdentityUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;

}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddRazorPages();
builder.Services.AddControllers();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "react-app/dist";
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SupportNonNullableReferenceTypes();
});

builder.Services.AddProxies();

#endregion

var app = builder.Build();

//var x = Environment.GetEnvironmentVariable("DB_PASS");

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
app.UseSpaStaticFiles();

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

app.RunProxy(proxy => proxy.UseHttp(frontendUrl));


app.Run();
