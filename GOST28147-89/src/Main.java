import java.math.BigInteger;

public class Main {

    public static void main(String[] args) {
        Lab02 lab02 = new Lab02();
        RSA rsa = new RSA(1024);
        rsa.start(lab02.getKey());

        rsa.start(new BigInteger("F2C22A3B6CA109A46D9B45DB3F2C578A", 16).toString());

        rsa.start("ÃÙ‡„∏Ê ƒ˝∏·");
    }
}