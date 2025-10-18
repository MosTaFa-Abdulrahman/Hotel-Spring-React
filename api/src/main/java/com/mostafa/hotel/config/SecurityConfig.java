package com.mostafa.hotel.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(c -> {
                    CorsConfigurationSource source = corsConfigurationSource();
                    c.configurationSource(source);
                })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers(
                                    "/api/auth/register",
                                    "/api/auth/login").permitAll()
                            // Swagger/OpenAPI endpoints
                            .requestMatchers(
                                    "/swagger-ui/**",
                                    "/swagger-ui.html",
                                    "/api-docs/**",
                                    "/v3/api-docs/**",
                                    "/swagger-resources/**",
                                    "/webjars/**")
                            .permitAll()
                            // logout/me
                            .requestMatchers(HttpMethod.GET, "/api/auth/me").authenticated()
                            .requestMatchers(HttpMethod.POST, "/api/auth/logout").authenticated()
                            // ((Users)) //
                            .requestMatchers(HttpMethod.PUT, "/api/users/{userId}").authenticated()
                            .requestMatchers(HttpMethod.DELETE, "/api/users/{userId}").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/users").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.GET, "/api/users/{userId}").authenticated()
                            // ((Hotels)) //
                            .requestMatchers(HttpMethod.POST, "/api/hotels").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.PUT, "/api/hotels/{hotelId}").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.DELETE, "/api/hotels/{hotelId}").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.GET, "/api/hotels").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/hotels/{hotelId}").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/hotels/search").permitAll()
                            // ((Apartments)) //
                            .requestMatchers(HttpMethod.POST, "/api/apartments").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.PUT, "/api/apartments/{apartmentId}").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.DELETE, "/api/apartments/{apartmentId}").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.GET, "/api/apartments/{apartmentId}").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/apartments").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/apartments/hotel/{hotelId}").permitAll()
                            // ((Rooms)) //
                            .requestMatchers(HttpMethod.POST, "/api/rooms").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.PUT, "/api/rooms/{roomId}").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.DELETE, "/api/rooms/{roomId}").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.GET, "/api/rooms/{roomId}").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/rooms").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/rooms/apartment/{apartmentId}").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/rooms/hotel/{hotelId}").permitAll()
                            // ((Bookings)) //
                            .requestMatchers(HttpMethod.POST, "/api/bookings").authenticated()
                            .requestMatchers(HttpMethod.DELETE, "/api/bookings/{bookingId}").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/bookings").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/bookings/{bookingId}").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/bookings/user/{userId}").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/bookings/room/{roomId}").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/bookings/apartment/{apartmentId}").authenticated()
                            // ((Payments)) //
                            .requestMatchers(HttpMethod.POST, "/api/payments").authenticated()
                            .requestMatchers(HttpMethod.PATCH, "/api/payments/{paymentId}/pay-shortage").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/payments/{paymentId}").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/payments/user/{userId}").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/payments").hasAnyRole("ADMIN", "MANAGER")
                            .requestMatchers(HttpMethod.GET, "/api/payments/current-user").authenticated()

                            .anyRequest()
                            .authenticated();

                })
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationManager(authenticationManager(http));

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        var authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

        return authBuilder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}