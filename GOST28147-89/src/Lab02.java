import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class Lab02 {

    private String key;
    private String text;

    private byte[] k = new byte[32];

    private final byte[][] Sbox = new byte[][] {
            { 0x04, 0x0a, 0x09, 0x02, 0x0d, 0x08, 0x00, 0x0e, 0x06, 0x0B, 0x01, 0x0c, 0x07, 0x0f, 0x05, 0x03 },
            { 0x0e, 0x0b, 0x04, 0x0c, 0x06, 0x0d, 0x0f, 0x0a, 0x02, 0x03, 0x08, 0x01, 0x00, 0x07, 0x05, 0x09 },
            { 0x05, 0x08, 0x01, 0x0d, 0x0a, 0x03, 0x04, 0x02, 0x0e, 0x0f, 0x0c, 0x07, 0x06, 0x00, 0x09, 0x0b },
            { 0x07, 0x0d, 0x0a, 0x01, 0x00, 0x08, 0x09, 0x0f, 0x0e, 0x04, 0x06, 0x0c, 0x0b, 0x02, 0x05, 0x03 },
            { 0x06, 0x0c, 0x07, 0x01, 0x05, 0x0f, 0x0d, 0x08, 0x04, 0x0a, 0x09, 0x0e, 0x00, 0x03, 0x0b, 0x02 },
            { 0x04, 0x0b, 0x0a, 0x00, 0x07, 0x02, 0x01, 0x0d, 0x03, 0x06, 0x08, 0x05, 0x09, 0x0c, 0x0f, 0x0e },
            { 0x0d, 0x0b, 0x04, 0x01, 0x03, 0x0f, 0x05, 0x09, 0x00, 0x0a, 0x0e, 0x07, 0x06, 0x08, 0x02, 0x0c },
            { 0x01, 0x0f, 0x0d, 0x00, 0x05, 0x07, 0x0a, 0x04, 0x09, 0x02, 0x03, 0x0e, 0x06, 0x0b, 0x08, 0x0c } };
    private PrintStream printf;

    public Lab02() {
        System.out.print("\n" + "Gost28147-89" + "\n");
        getEncryptedText();
        generateKey();
        this.k = this.key.getBytes(Charset.forName("UTF-8"));

        final byte[] encoded = Gost28147_89EncodeBasic(text, k);
        PrintByteArray(encoded);

        final byte[] decoded = Gost28147_89DecodeBasic(encoded, k);
        System.out.print("================================" + "\n");
        System.out.print("Result of decrypt\n" + new String(decoded, StandardCharsets.UTF_8) + "\n");
    }

    public byte[] Gost28147_89EncodeBasic(final String text, final byte[] k) {
        final byte[] TextByteArray = PrepareByteArray(text);
        final byte[] result = new byte[TextByteArray.length];

        int offset = 0;

        while (offset < TextByteArray.length) {
            final byte[] encrypted = Gost28147_89EncodeBlockFunction(Get64BitBlockFromArray(TextByteArray, offset),
                    this.k);
            System.arraycopy(encrypted, 0, result, offset, encrypted.length);
            offset += 8;
        }
        return result;
    }

    public byte[] Gost28147_89DecodeBasic(final byte[] array, final byte[] k) {
        final byte[] TextByteArray = array;
        final byte[] result = new byte[TextByteArray.length];

        int offset = 0;

        while (offset < TextByteArray.length) {
            final byte[] encrypted = Gost28147_89DecodeBlockFunction(Get64BitBlockFromArray(TextByteArray, offset),
                    this.k);
            System.arraycopy(encrypted, 0, result, offset, encrypted.length);
            offset += 8;
        }

        return result;
    }

    private byte[] Gost28147_89EncodeBlockFunction(final byte[] block, final byte[] k) {
        int N1 = BytesToint(Get32BitBlockFromArray(block, 0), 0);// first 32 bits
        int N2 = BytesToint(Get32BitBlockFromArray(block, 4), 0);// last 32 bits

        for (int i = 0; i < 3; i++) {
            for (int ki = 0; ki < 8; ki++) {
                final int temp = N1;
                N1 = N2 ^ Gost28147_89MainStep(N1, BytesToint(Get32BitBlockFromArray(k, ki * 4), 0));
                N2 = temp;
            }
        }

        for (int ki = 7; ki > 0; ki--) // 25-31 steps
        {
            final int tmp = N1;
            N1 = N2 ^ Gost28147_89MainStep(N1, BytesToint(Get32BitBlockFromArray(k, ki * 4), 0)); // CM2
            N2 = tmp;
        }

        N2 = N2 ^ Gost28147_89MainStep(N1, BytesToint(Get32BitBlockFromArray(k, 0), 0)); // 32 step (N1=N1)

        final byte[] result = new byte[8];
        IntTobytes(N1, result, 0);
        IntTobytes(N2, result, 4);

        return result;

    }

    private byte[] Gost28147_89DecodeBlockFunction(final byte[] block, final byte[] k) {
        int N1 = BytesToint(Get32BitBlockFromArray(block, 0), 0);// first 32 bits
        int N2 = BytesToint(Get32BitBlockFromArray(block, 4), 0);// last 32 bits

        for (int ki = 0; ki < 8; ki++) // 1-8 steps
        {
            final int tmp = N1;
            N1 = N2 ^ Gost28147_89MainStep(N1, BytesToint(Get32BitBlockFromArray(k, ki * 4), 0)); // CM2
            N2 = tmp;
        }
        for (int i = 0; i < 3; i++) // 9-31 steps
        {
            for (int ki = 7; ki >= 0; ki--) {
                if ((i == 2) && (ki == 0)) {
                    break; // break 32 step
                }
                final int tmp = N1;
                N1 = N2 ^ Gost28147_89MainStep(N1, BytesToint(Get32BitBlockFromArray(k, ki * 4), 0)); // CM2
                N2 = tmp;
            }
        }

        N2 = N2 ^ Gost28147_89MainStep(N1, BytesToint(Get32BitBlockFromArray(k, 0), 0)); // 32 step (N1=N1)

        final byte[] result = new byte[8];
        IntTobytes(N1, result, 0);
        IntTobytes(N2, result, 4);

        return result;
    }

    private int Gost28147_89MainStep(final int n1, final int key) {
        final int cm = (key + n1); // CM1

        // S-box replacing
        int om = Sbox[0][((cm >> (0 * 4)) & 0xF)] << (0 * 4);
        om += Sbox[1][((cm >> (1 * 4)) & 0xF)] << (1 * 4);
        om += Sbox[2][((cm >> (2 * 4)) & 0xF)] << (2 * 4);
        om += Sbox[3][((cm >> (3 * 4)) & 0xF)] << (3 * 4);
        om += Sbox[4][((cm >> (4 * 4)) & 0xF)] << (4 * 4);
        om += Sbox[5][((cm >> (5 * 4)) & 0xF)] << (5 * 4);
        om += Sbox[6][((cm >> (6 * 4)) & 0xF)] << (6 * 4);
        om += Sbox[7][((cm >> (7 * 4)) & 0xF)] << (7 * 4);
        return om << 11 | om >>> (32 - 11); // 11 bit-leftshift
    }

    private byte[] PrepareByteArray(final String text) {
        final byte[] original = text.getBytes(Charset.forName("UTF-8"));
        int blocksCount = original.length % 8;

        if (blocksCount != 0) {
            blocksCount = original.length / 8 + 1;
        } else {
            blocksCount = original.length / 8;
        }

        final byte[] result = new byte[blocksCount * 8];
        System.arraycopy(text.getBytes(Charset.forName("UTF-8")), 0, result, 0, original.length);

        return result;
    }

    private byte[] Get64BitBlockFromArray(final byte[] array, final int offset) {
        final byte[] result = new byte[8];
        System.arraycopy(array, offset, result, 0, 8);
        return result;
    }

    private byte[] Get32BitBlockFromArray(final byte[] array, final int offset) {
        final byte[] result = new byte[4];
        System.arraycopy(array, offset, result, 0, 4);
        return result;
    }

    // array of bytes to type int
    private int BytesToint(final byte[] in, final int inOff) {
        return ((in[inOff + 3] << 24) & 0xff000000) + ((in[inOff + 2] << 16) & 0xff0000)
                + ((in[inOff + 1] << 8) & 0xff00) + (in[inOff] & 0xff);
    }

    // int to array of bytes
    private void IntTobytes(final int num, final byte[] out, final int outOff) {
        out[outOff + 3] = (byte) (num >>> 24);
        out[outOff + 2] = (byte) (num >>> 16);
        out[outOff + 1] = (byte) (num >>> 8);
        out[outOff] = (byte) num;
    }

    private void PrintByteArray(final byte[] array) {
        String result = "";
        for (final byte b : array) {
            final byte[] temp = new byte[1];
            temp[0] = b;
            result += Byte.toString(b) + " ";
        }

        System.out.print("================================" + "\n");
        System.out.print("Result of crypt\n" + result + "\n");
        try (FileWriter writer = new FileWriter("src/encrypted_symmetric.txt", false)) {
            writer.write("Result of crypt\n" + result + "\n");
            writer.flush();
        } catch (final IOException ex) {

            System.out.print(ex.getMessage());
        }
    }

    public void getEncryptedText() {
        try (FileReader reader = new FileReader("src/ciphertext.txt")) {
            int c;
            int length = 0;
            this.text = "";
            while ((c = reader.read()) != -1) {
                length++;
                this.text += (char) c;
            }
            this.text = new String(this.text.getBytes("windows-1251"), "utf-8");
            if (text.substring(length - 3, length).equals("_16")) {
                this.text = new BigInteger(text.substring(0, length - 4), 16).toString();
            }
        } catch (final IOException ex) {
            System.out.print(ex.getMessage());
        }
        System.out.print("================================" + "\n");
        System.out.print("The text: " + this.text + "\n");
    }

    public void generateKey() {
        final BigInteger maxLimit = new BigInteger("500000000000000000000000000000000000000000000000000000000000");
        final BigInteger minLimit = new BigInteger("1000000000000000000000000000000");
        final BigInteger bigInteger = maxLimit.subtract(minLimit);
        final Random randNum = new Random();
        final int len = maxLimit.bitLength();
        BigInteger res = new BigInteger(len, randNum);
        if (res.compareTo(minLimit) < 0)
            res = res.add(minLimit);
        if (res.compareTo(bigInteger) >= 0)
            res = res.mod(bigInteger).add(minLimit);
        System.out.print("================================\n");
        System.out.print("The key = " + res + "\n");
        this.key = res.toString();
    }

    public String getKey() {
        return this.key;
    }
}