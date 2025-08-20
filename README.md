# elif.rs-web

Landing page for the [elif.rs](https://github.com/krcpa/elif.rs) web framework.

## Overview

This repository contains the official landing page for elif.rs, a modern Rust web framework designed for shipping fast. The framework emphasizes type safety, performance, and developer experience with its pure framework API approach.

## Features

- 🎨 Modern, minimalist design following the principles in CLAUDE.md
- 📱 Fully responsive layout optimized for all devices
- ⚡ Zero JavaScript dependencies - pure HTML/CSS performance
- 🔗 Direct links to GitHub repository and documentation
- 💻 Accurate framework examples with syntax highlighting
- 🏗️ Pure framework API demonstrations using native types
- 🎯 Real-world examples including routing, middleware, ORM, and WebSockets

## Quick Start Examples

### Installation
```bash
cargo install elifrs
```

### Basic Server
```rust
use elif_http::{Server, HttpConfig};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = HttpConfig::default();
    let server = Server::new(config);
    server.run("0.0.0.0:3000").await?;
    Ok(())
}
```

### Routing with Native Types
```rust
use elif_http::{
    ElifRouter, ElifRequest, ElifResponse, HttpResult,
    routing::{Route, RouteBuilder, RouteGroup}
};

async fn index(_request: &ElifRequest) -> HttpResult<ElifResponse> {
    Ok(ElifResponse::ok().text("Welcome to elif.rs!"))
}

async fn show_user(request: &ElifRequest) -> HttpResult<ElifResponse> {
    let id: u32 = request.path_param_parsed("id")?;
    let user = User { id, name: format!("User {}", id) };
    Ok(ElifResponse::ok().json(&user)?)
}

pub fn routes() -> ElifRouter {
    ElifRouter::new()
        .add_route(Route::get("/", index))
        .add_route(Route::get("/users/:id", show_user))
}
```

### Advanced Middleware V2
```rust
use elif_http::middleware::v2::{
    MiddlewarePipelineV2, Middleware, Next,
    factories, ConditionalMiddleware, composition
};

// Compose multiple middleware efficiently
let api_middleware = composition::compose3(
    factories::rate_limit(100), // 100 requests per minute
    factories::cors_with_origins(vec!["https://yourdomain.com".to_string()]),
    factories::timeout(Duration::from_secs(30))
);

// Conditional middleware execution
let auth_middleware = ConditionalMiddleware::new(
    factories::bearer_auth("secret-token".to_string())
)
.skip_paths(vec!["/public/*", "/health"])
.only_methods(vec![ElifMethod::POST, ElifMethod::PUT]);
```

## Development

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/krcpa/elif.rs-web.git
cd elif.rs-web
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using Rust
cargo install basic-http-server
basic-http-server
```

### Project Structure

```
elif.rs-web/
├── index.html      # Main landing page
├── style.css       # Stylesheet with modern design system
├── CLAUDE.md       # Design philosophy and guidelines
└── README.md       # This file
```

### Design Principles

The website follows a minimalist design philosophy outlined in `CLAUDE.md`:

- **Typography First**: Clean, modern Inter font for excellent readability
- **Monochrome Base**: Black and white with electric blue (#0066ff) accent
- **Generous Whitespace**: Creates visual hierarchy through spacing
- **Developer-First**: Technical honesty with no magic or surprises

## Framework Highlights

### Pure Framework API
elif.rs provides native types instead of raw re-exports:
- `ElifRequest` / `ElifResponse` with borrowing API for efficient middleware
- `ElifRouter` with intuitive route building
- Framework-native middleware system with composition helpers

### Performance Features
- Zero-copy request handling
- Efficient middleware pipeline with minimal allocations
- Built-in caching with multiple backends
- WebSocket support with channel management

### Developer Experience
- Type-safe route parameters and JSON parsing
- Comprehensive error handling
- Built-in testing utilities
- CLI tools for scaffolding and development

## Deployment

The site is designed for static hosting:

- **GitHub Pages**: Enable in repository settings
- **Netlify**: Connect repository and deploy
- **Vercel**: Import project and deploy
- **Cloudflare Pages**: Connect and deploy

No build step required - just serve the static files.

## Contributing

Contributions are welcome! Please:

1. Follow the design principles in `CLAUDE.md`
2. Ensure examples use correct elif.rs API syntax
3. Test responsiveness across devices
4. Submit a Pull Request with clear description

## Related Projects

- [elif.rs](https://github.com/krcpa/elif.rs) - The main framework repository
- [elif-cli](https://github.com/krcpa/elif.rs/tree/main/crates/elif-cli) - CLI tools
- [elif-orm](https://github.com/krcpa/elif.rs/tree/main/crates/elif-orm) - ORM integration

## License

This project is licensed under the MIT License - see the [elif.rs repository](https://github.com/krcpa/elif.rs) for details.

---

Built with care for the elif.rs community