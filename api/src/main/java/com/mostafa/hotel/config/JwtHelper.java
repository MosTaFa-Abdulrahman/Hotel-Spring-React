package com.mostafa.hotel.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;


@Component
public class JwtHelper {
    @Value("${jwt.secret}")
    private String JWT_SECRET;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        final Date tokenExpirationDate = extractClaim(token, Claims::getExpiration);

        boolean usernameMatch = Objects.equals(username, userDetails.getUsername());
        boolean tokenIsExpired = tokenExpirationDate.before(new Date(System.currentTimeMillis()));

        return usernameMatch && !tokenIsExpired;
    }

    public String generateToken(UserDetails userDetails) {
        return this.generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 14))
                .signWith(getSignInKey())
                .compact();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        try {
            // First, try to decode as Base64 (recommended approach)
            byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);

            // Check if the decoded key is at least 256 bits (32 bytes)
            if (keyBytes.length >= 32) {
                return Keys.hmacShaKeyFor(keyBytes);
            }
        } catch (IllegalArgumentException e) {
            // If Base64 decoding fails, treat as raw string
            System.out.println("JWT_SECRET is not valid Base64, treating as raw string");
        }

        // Fallback: Hash the string to ensure minimum length
        return Keys.hmacShaKeyFor(hashSecret(JWT_SECRET));
    }

    private byte[] hashSecret(String secret) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return digest.digest(secret.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }


}