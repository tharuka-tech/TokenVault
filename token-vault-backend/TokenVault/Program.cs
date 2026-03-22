using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TokenVault.Data;
using TokenVault.Services;

var builder = WebApplication.CreateBuilder(args);

// =========================
// 🔹 Add Services
// =========================

builder.Services.AddControllersWithViews();

// ✅ Swagger (ADD THIS - IMPORTANT)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// 🔐 JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
        )
    };
});

// ✅ CORS (Allow React frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
    );
});

// ✅ Custom Services
builder.Services.AddScoped<TokenService>();

builder.Services.AddAuthorization();

var app = builder.Build();

// =========================
// 🔹 Seed Database
// =========================
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    DataSeeder.Seed(context);
}

// =========================
// 🔹 Middleware Pipeline
// =========================

// ❌ Don't restrict Swagger (enable always for now)
app.UseSwagger();
app.UseSwaggerUI();

// Error handling (production)
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// ✅ CORS (must be BEFORE auth)
app.UseCors("AllowReact");

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// 🔥 ORDER IS VERY IMPORTANT
app.UseAuthentication();
app.UseAuthorization();

// ✅ Map Controllers
app.MapControllers();

// Optional MVC route (keep if using Views)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

app.Run();