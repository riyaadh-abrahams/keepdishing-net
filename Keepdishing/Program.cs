using Keepdishing.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

#region Builder

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(connectionString);
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
builder.Services.AddSwaggerGen();

#endregion

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

//Added this to redirect to login page prior to loading SPA    
app.Use(async (context, next) =>
{

    if (!context.User.Identity.IsAuthenticated)
    {
        await context.ChallengeAsync("Identity.Application");
    }
    else
    {
        await next();
    }

});


app.UseSpa(spa =>
{
    spa.Options.SourcePath = "react-app";
    spa.Options.DevServerPort = 3000;

    if (app.Environment.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer($"http://localhost:{spa.Options.DevServerPort}/");

    }
});

app.Run();
