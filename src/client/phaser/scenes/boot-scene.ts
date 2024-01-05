export class BootScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  private errorText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload() {
    this.load.html("form", "assets/login.html");

    this.load.bitmapFont(
      'snakeFont',
      './assets/font/snakeFont.png',
      './assets/font/snakeFont.fnt'
    );
  }

  create(): void {

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 80,
        'snakeFont',
        'S N A K E',
        16
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 85,
        this.sys.canvas.height / 2 - 55,
        'snakeFont',
        'L E G A C Y',
        16
      )
    );

    this.errorText = this.add.bitmapText(
      20,
      this.sys.canvas.height / 2 + 50,
      'snakeFont',
      '',
      7
    )

    const form = this.add.dom(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2 + 20
    ).createFromCache("form");

    const returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    returnKey.on("down", (_: any) => {
      const username = <HTMLInputElement>form.getChildByName("username");
      if (username.value == "") {
        this.setError("Choose username")
        return
      }

      if (username.value.length > 7) {
        this.setError("Max 7 characters")
        return
      }

      if (!/^[\p{L}\p{N}]+$/u.test(username.value)) {
        this.setError("Only alphanumerics")
        return
      }

      sessionStorage.setItem("username", username.value);
    });
  }

  setError(message: string) {
    this.errorText.setText(message);
    setTimeout(() => {
      this.errorText.setText("");
    }, 2000);
  }

  update(): void {
    if (sessionStorage.getItem("username")) {
      this.scene.start('MainMenuScene');
    }
  }
}
