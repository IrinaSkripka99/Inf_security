import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class RSA {

    private PublicKey publicKey;
    private PrivateKey privateKey;

    public RSA(int bitLength) {
        BigInteger p = BigInteger.probablePrime(bitLength, new Random());
        BigInteger q = BigInteger.probablePrime(bitLength, new Random());
        BigInteger n = p.multiply(q);
        BigInteger phi = (p.subtract(BigInteger.ONE)).multiply(q.subtract(BigInteger.ONE));
        BigInteger e = new BigInteger("3");
        while (!phi.gcd(e).equals(BigInteger.ONE)) {
            e = e.add(new BigInteger("2"));
        }
        BigInteger d = e.modInverse(phi);
        publicKey = new PublicKey(e, n);
        privateKey = new PrivateKey(d, n);
        try (FileWriter writer = new FileWriter("src/keys.txt", false)) {
            writer.write(publicKey.toString());
            writer.append('\n');
            writer.write(privateKey.toString());
            writer.flush();
        } catch (IOException ex) {
            System.out.print(ex.getMessage());
        }
    }

    public String getPublicKey() {
        return publicKey.toString();
    }

    public String getPrivateKey() {
        return privateKey.toString();
    }

    public String encrypt(String message) {
        BigInteger plaintext = new BigInteger(message.getBytes(StandardCharsets.UTF_8));
        BigInteger encrypted = plaintext.modPow(publicKey.getE(), publicKey.getN());
        try (FileWriter writer = new FileWriter("src/asymmetric_encrypted.txt", false)) {
            String messageEncrypt = encrypted.toString(16);
            writer.write(messageEncrypt);
            writer.flush();
        } catch (IOException ex) {

            System.out.print(ex.getMessage());
        }
        return encrypted.toString(16);
    }

    public String decrypt(String encryptedText) {
        BigInteger encrypted = new BigInteger(encryptedText, 16);
        BigInteger decrypted = encrypted.modPow(privateKey.getD(), privateKey.getN());
        return new String(decrypted.toByteArray());
    }

    public void start(String message) {
        try {
            System.out.println("\nRSA\n");
            System.out.println("===========================");
            System.out.println("Original Message:  \"" + new String(message.getBytes("windows-1251"), "utf-8") + "\"");
            String encrypted = this.encrypt(new String(message.getBytes("windows-1251"), "utf-8"));
            System.out.println("===========================");
            System.out.println("Encrypted Message: " + encrypted);
            String decrypted = this.decrypt(encrypted);
            System.out.println("===========================");
            System.out.println("Decrypted Message: \"" + decrypted + "\"");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}